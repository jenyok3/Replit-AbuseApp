import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Send, 
  Chrome, 
  Users, 
  LogOut,
  Bug
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const type = "telegram"; // This could be state-driven

  return (
    <div className="w-20 lg:w-64 h-screen border-r border-white/5 bg-black/95 flex flex-col shrink-0 transition-all duration-300">
      {/* Header / Logo Area */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <Bug className="text-white w-6 h-6" />
        </div>
        <span className="ml-3 font-display font-bold text-lg hidden lg:block tracking-wide">
          Abuse<span className="text-primary">App</span>
        </span>
      </div>

      {/* Farm Type Switcher */}
      <div className="p-4 space-y-2">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-center lg:justify-start gap-3 h-12 rounded-xl transition-all",
            type === "telegram" 
              ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
              : "text-muted-foreground hover:bg-white/5 hover:text-white"
          )}
        >
          <Send className="w-5 h-5 text-primary" />
          <span className="hidden lg:block font-medium">Telegram</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-center lg:justify-start gap-3 h-12 rounded-xl transition-all",
            type === "chrome" 
              ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
              : "text-muted-foreground hover:bg-white/5 hover:text-white"
          )}
        >
          <Chrome className="w-5 h-5 text-primary" />
          <span className="hidden lg:block font-medium">Chrome</span>
        </Button>
      </div>

      <div className="h-px bg-white/5 mx-4 my-2" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
            location === item.href 
              ? "text-white bg-white/5 shadow-inner" 
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}>
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
              "text-primary"
            )} />
            <span className="hidden lg:block font-medium">{item.label}</span>
            
            {location === item.href && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center justify-center lg:justify-start gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/10" />
          <div className="hidden lg:flex flex-col items-start overflow-hidden">
            <span className="text-sm font-medium text-white truncate w-full">Administrator</span>
            <span className="text-xs text-muted-foreground">admin@abuseapp.io</span>
          </div>
          <LogOut className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-red-400 hidden lg:block" />
        </button>
      </div>
    </div>
  );
}
