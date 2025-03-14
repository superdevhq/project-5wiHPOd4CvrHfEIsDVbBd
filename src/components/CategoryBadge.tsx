
import { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <Badge 
      className={className}
      style={{ backgroundColor: category.color, color: 'white' }}
      variant="default"
    >
      {category.name}
    </Badge>
  );
};

export default CategoryBadge;
