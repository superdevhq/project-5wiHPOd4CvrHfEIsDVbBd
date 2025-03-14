
import { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { 
  CalendarDays, 
  CheckSquare, 
  Home, 
  ListTodo, 
  PlusCircle, 
  Settings, 
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border/50">
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sidebar-foreground">TaskMaster</h3>
                  <p className="text-xs text-sidebar-foreground/60">Organize your tasks</p>
                </div>
              </div>
              <div className="relative z-50">
                <SidebarTrigger />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/")}
                  isActive={currentPath === "/"}
                  tooltip="Dashboard"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/tasks")}
                  isActive={currentPath === "/tasks"}
                  tooltip="Tasks"
                >
                  <ListTodo className="h-4 w-4" />
                  <span>Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/calendar")}
                  isActive={currentPath === "/calendar"}
                  tooltip="Calendar"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Work">
                    <div className="h-3 w-3 rounded-full bg-[#4361ee]" />
                    <span>Work</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Personal">
                    <div className="h-3 w-3 rounded-full bg-[#3a86ff]" />
                    <span>Personal</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Health">
                    <div className="h-3 w-3 rounded-full bg-[#38b000]" />
                    <span>Health</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Shopping">
                    <div className="h-3 w-3 rounded-full bg-[#ff006e]" />
                    <span>Shopping</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Learning">
                    <div className="h-3 w-3 rounded-full bg-[#8338ec]" />
                    <span>Learning</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Manage Categories">
                    <Tag className="h-4 w-4" />
                    <span>Manage Categories</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border/50">
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full justify-start gap-3" 
                size="sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Task</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3" 
                size="sm"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="w-full flex-1">
          <div className="h-full w-full overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
