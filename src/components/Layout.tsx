import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, History, Settings, ScanLine, RotateCcw, Users, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Mock user role - in real app this would come from auth context
  const userRole = "admin"; // student, librarian, admin

  const navigationItems = [
    { to: "/", icon: Home, label: "Home", roles: ["student", "librarian", "admin"] },
    { to: "/browse", icon: BookMarked, label: "Browse Books", roles: ["student", "librarian", "admin"] },
    { to: "/borrow", icon: ScanLine, label: "Borrow Book", roles: ["student", "librarian", "admin"] },
    { to: "/return", icon: RotateCcw, label: "Return Book", roles: ["student", "librarian", "admin"] },
    { to: "/history", icon: History, label: "My History", roles: ["student", "librarian", "admin"] },
    { to: "/admin", icon: Settings, label: "Admin", roles: ["librarian", "admin"] },
  ];

  const visibleItems = navigationItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SFC Digital Library</h1>
              <p className="text-xs text-muted-foreground">Sixth Form Committee</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.to}
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "transition-all duration-200",
                    isActive(item.to) && "shadow-md"
                  )}
                >
                  <Link to={item.to} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">John Smith</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-border bg-card/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center space-x-1 overflow-x-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.to}
                variant={isActive(item.to) ? "default" : "ghost"}
                size="sm"
                asChild
                className={cn(
                  "flex-shrink-0 min-w-fit",
                  isActive(item.to) && "shadow-md"
                )}
              >
                <Link to={item.to} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--gradient-footer)' }} className="text-white mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg">SFC Digital Library</h3>
              <p className="text-sm opacity-90">Empowering academic excellence through accessible resources</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-90">&copy; 2024 Sixth Form Committee</p>
              <p className="text-xs opacity-75">Built for educational excellence</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;