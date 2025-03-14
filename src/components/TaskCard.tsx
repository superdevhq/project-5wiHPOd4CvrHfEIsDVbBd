
import { useState } from "react";
import { Task, Category } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import CategoryBadge from "./CategoryBadge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  categories: Category[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const TaskCard = ({ 
  task, 
  categories, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const category = categories.find(c => c.id === task.categoryId);
  
  const formattedDate = task.dueDate 
    ? format(task.dueDate, "MMM d, yyyy") 
    : "No due date";

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        task.completed ? "opacity-70" : "opacity-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={(checked) => {
              onToggleComplete(task.id, checked as boolean);
            }}
            className="mt-1"
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "text-lg font-medium transition-all",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              <div className={cn(
                "flex gap-2 transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onEdit(task)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className={cn(
              "text-sm text-muted-foreground mb-2",
              task.completed && "line-through"
            )}>
              {task.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="text-xs text-muted-foreground flex items-center">
                Due: {formattedDate}
              </div>
              
              <div className="flex-1"></div>
              
              {category && (
                <CategoryBadge category={category} />
              )}
              
              <PriorityBadge priority={task.priority} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
