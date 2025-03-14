
import React from "react";
import { Task, Category, Priority } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface TaskStatisticsProps {
  tasks: Task[];
  categories: Category[];
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks, categories }) => {
  // Calculate completion rate
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate category distribution
  const categoryData = categories.map(category => {
    const count = tasks.filter(task => task.categoryId === category.id).length;
    return {
      name: category.name,
      value: count,
      color: category.color,
    };
  }).filter(item => item.value > 0);

  // Calculate priority distribution
  const priorityCount = {
    low: tasks.filter(task => task.priority === "low").length,
    medium: tasks.filter(task => task.priority === "medium").length,
    high: tasks.filter(task => task.priority === "high").length,
  };

  const priorityData = [
    { name: "Low", value: priorityCount.low, color: "#4ade80" },
    { name: "Medium", value: priorityCount.medium, color: "#fb923c" },
    { name: "High", value: priorityCount.high, color: "#f87171" },
  ].filter(item => item.value > 0);

  // Calculate upcoming deadlines (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate && task.dueDate > today && task.dueDate <= nextWeek)
    .sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      return 0;
    });

  // Calculate task completion trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const trendData = last7Days.map(date => {
    const dateString = date.toISOString().split('T')[0];
    // This is a placeholder - in a real app, you'd track when tasks were completed
    // For now, we'll generate random data for demonstration
    return {
      date: dateString,
      completed: Math.floor(Math.random() * 5), // Random number 0-4 for demo
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Task Statistics</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Completion Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{completionRate}% Complete</span>
                <span>{completedTasks}/{totalTasks} Tasks</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {priorityData.length > 0 ? (
              <div className="h-[150px] w-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} tasks`, name]}
                      labelFormatter={() => 'Priority'}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-muted-foreground">No priority data available</p>
            )}
            <div className="ml-4 flex flex-col justify-center space-y-2">
              {priorityData.map((entry) => (
                <div key={entry.name} className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                    <Bar dataKey="value" name="Tasks">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-muted-foreground">No category data available</p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-2">
                {upcomingTasks.slice(0, 5).map(task => {
                  const daysLeft = task.dueDate ? 
                    Math.ceil((task.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;
                  
                  return (
                    <div key={task.id} className="flex justify-between items-center">
                      <span className="truncate max-w-[200px]">{task.title}</span>
                      <span className={`text-sm ${daysLeft <= 1 ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                        {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days`}
                      </span>
                    </div>
                  );
                })}
                {upcomingTasks.length > 5 && (
                  <p className="text-sm text-muted-foreground text-right">
                    +{upcomingTasks.length - 5} more
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming deadlines</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskStatistics;
