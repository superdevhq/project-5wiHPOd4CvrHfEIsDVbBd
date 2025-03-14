
import { Priority } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const priorityClasses = {
    low: "bg-green-500 hover:bg-green-600",
    medium: "bg-amber-500 hover:bg-amber-600",
    high: "bg-red-500 hover:bg-red-600",
  };

  const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <Badge 
      className={cn(priorityClasses[priority], "text-white", className)}
      variant="default"
    >
      {priorityLabels[priority]}
    </Badge>
  );
};

export default PriorityBadge;
