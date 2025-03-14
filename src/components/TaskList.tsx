
import { useState } from "react";
import { Task, Category } from "@/lib/types";
import TaskCard from "./TaskCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const TaskList = ({
  tasks,
  categories,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleComplete
}: TaskListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (categoryFilter && task.categoryId !== categoryFilter) {
      return false;
    }
    
    // Priority filter
    if (priorityFilter && task.priority !== priorityFilter) {
      return false;
    }
    
    // Completed filter
    if (!showCompleted && task.completed) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select 
            value={categoryFilter || ""} 
            onValueChange={(value) => setCategoryFilter(value || null)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={priorityFilter || ""} 
            onValueChange={(value) => setPriorityFilter(value || null)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
          
          <Button onClick={onAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              categories={categories}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tasks found. {tasks.length > 0 ? "Try adjusting your filters." : "Create your first task!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
