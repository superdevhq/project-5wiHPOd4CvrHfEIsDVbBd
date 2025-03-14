
export type Priority = "low" | "medium" | "high";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  completed: boolean;
  priority: Priority;
  categoryId: string | null;
};

// Sample data for development
export const sampleCategories: Category[] = [
  { id: "1", name: "Work", color: "#4361ee" },
  { id: "2", name: "Personal", color: "#3a86ff" },
  { id: "3", name: "Health", color: "#38b000" },
  { id: "4", name: "Shopping", color: "#ff006e" },
  { id: "5", name: "Learning", color: "#8338ec" }
];

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send it to the team for review",
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    completed: false,
    priority: "high",
    categoryId: "1"
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables",
    dueDate: new Date(Date.now() + 86400000), // 1 day from now
    completed: false,
    priority: "medium",
    categoryId: "4"
  },
  {
    id: "3",
    title: "Morning jog",
    description: "30 minutes run in the park",
    dueDate: new Date(),
    completed: true,
    priority: "low",
    categoryId: "3"
  },
  {
    id: "4",
    title: "Read React documentation",
    description: "Focus on hooks and context API",
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    completed: false,
    priority: "medium",
    categoryId: "5"
  },
  {
    id: "5",
    title: "Call mom",
    description: "Weekly catch-up call",
    dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    completed: false,
    priority: "high",
    categoryId: "2"
  }
];
