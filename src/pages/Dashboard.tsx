
import { useState } from "react";
import { Task, Category, sampleTasks, sampleCategories } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/TaskList";
import CalendarView from "@/components/CalendarView";
import TaskForm from "@/components/TaskForm";
import TaskStatistics from "@/components/TaskStatistics";
import { v4 as uuidv4 } from "uuid";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [categories] = useState<Category[]>(sampleCategories);
  const [activeTab, setActiveTab] = useState("list");
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showStats, setShowStats] = useState(false);

  const handleAddTask = () => {
    setCurrentTask(null);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (currentTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? { ...task, ...taskData } : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: uuidv4(),
        ...taskData
      };
      setTasks([...tasks, newTask]);
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const dueSoonTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  }).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your task management dashboard
          </p>
        </div>
        <button 
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {showStats ? "Hide Statistics" : "Show Statistics"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks} pending, {completedTasks} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks > 0 
                ? `${Math.round((completedTasks / totalTasks) * 100)}% completion rate` 
                : "No tasks completed yet"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueSoonTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks due in the next 48 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {showStats && (
        <TaskStatistics tasks={tasks} categories={categories} />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <TaskList
            tasks={tasks}
            categories={categories}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </TabsContent>
        
        <TabsContent value="calendar">
          <CalendarView
            tasks={tasks}
            categories={categories}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
          />
        </TabsContent>
      </Tabs>

      <TaskForm
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        task={currentTask}
        categories={categories}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;
