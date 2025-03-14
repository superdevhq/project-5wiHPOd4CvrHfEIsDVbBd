
import { useState } from "react";
import { Task, Category } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format, isSameDay } from "date-fns";
import PriorityBadge from "./PriorityBadge";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  tasks: Task[];
  categories: Category[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const CalendarView = ({ tasks, categories, onAddTask, onEditTask }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get tasks for the selected date
  const tasksForSelectedDate = selectedDate 
    ? tasks.filter(task => task.dueDate && isSameDay(task.dueDate, selectedDate))
    : [];

  // Function to get task dates for highlighting in calendar
  const getTaskDates = () => {
    const dates: Record<string, { tasks: number; priority: string }> = {};
    
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateStr = format(task.dueDate, "yyyy-MM-dd");
        
        if (!dates[dateStr]) {
          dates[dateStr] = { tasks: 0, priority: "low" };
        }
        
        dates[dateStr].tasks += 1;
        
        // Update to highest priority
        if (task.priority === "high" || 
            (task.priority === "medium" && dates[dateStr].priority === "low")) {
          dates[dateStr].priority = task.priority;
        }
      }
    });
    
    return dates;
  };

  const taskDates = getTaskDates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            taskDay: (date) => {
              const dateStr = format(date, "yyyy-MM-dd");
              return !!taskDates[dateStr];
            }
          }}
          modifiersStyles={{
            taskDay: { fontWeight: "bold" }
          }}
          components={{
            DayContent: (props) => {
              const dateStr = format(props.date, "yyyy-MM-dd");
              const dayData = taskDates[dateStr];
              
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {props.children}
                  {dayData && (
                    <div className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                      dayData.priority === "high" ? "bg-red-500" :
                      dayData.priority === "medium" ? "bg-amber-500" : "bg-green-500"
                    )} />
                  )}
                </div>
              );
            }
          }}
        />
        
        <div className="mt-4 flex justify-center">
          <Button onClick={onAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
        </h2>
        
        <div className="space-y-3">
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task) => {
              const category = categories.find(c => c.id === task.categoryId);
              
              return (
                <Card 
                  key={task.id} 
                  className={cn(
                    "transition-all duration-200 hover:shadow-md cursor-pointer",
                    task.completed ? "opacity-70" : "opacity-100"
                  )}
                  onClick={() => onEditTask(task)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "text-lg font-medium",
                            task.completed && "line-through text-muted-foreground"
                          )}>
                            {task.title}
                          </h3>
                          
                          <PriorityBadge priority={task.priority} />
                        </div>
                        
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          task.completed && "line-through"
                        )}>
                          {task.description}
                        </p>
                        
                        {category && (
                          <div className="mt-2 text-xs font-medium" style={{ color: category.color }}>
                            {category.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No tasks scheduled for this date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
