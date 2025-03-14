
import { useState } from "react";
import { Task, Category, sampleTasks, sampleCategories } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/TaskList";
import CalendarView from "@/components/CalendarView";
import TaskForm from "@/components/TaskForm";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [categories] = useState<Category[]>(sampleCategories);
  const [activeTab, setActiveTab] = useState("list");
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

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

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
        <p className="text-muted-foreground">
          Organize your tasks, set priorities, and track deadlines
        </p>
      </header>

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

export default Index;
