import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Settings, 
  Send, 
  Chrome, 
  Users, 
  LogOut,
  Bug,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Settings, label: "Налаштування", href: "/settings" },
  ];

  const type = "telegram"; // This could be state-driven

  return (
    <div className={cn(
      "h-screen border-r border-white/5 bg-black/95 flex flex-col shrink-0 transition-all duration-300 relative",
      isExpanded ? "w-64" : "w-20"
    )}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-primary border border-white/10 flex items-center justify-center z-50 text-white hover:scale-110 transition-transform"
      >
        {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Header / Logo Area */}
      <div className="h-20 flex items-center border-b border-white/5 overflow-hidden px-5">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <Bug className="text-white w-6 h-6" />
        </div>
        <span className={cn(
          "font-display font-bold text-lg tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden",
          isExpanded ? "ml-3 opacity-100 w-auto" : "ml-0 opacity-0 w-0"
        )}>
          Abuse<span className="text-primary">App</span>
        </span>
      </div>

      {/* Farm Type Switcher */}
      <div className="p-4 space-y-2">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full h-12 rounded-xl transition-all flex items-center overflow-hidden px-0",
            isExpanded ? "justify-start px-3 gap-3" : "justify-center",
            type === "telegram" 
              ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
              : "text-muted-foreground hover:bg-white/5 hover:text-white"
          )}
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6 text-primary" />
          </div>
          <span className={cn(
            "font-medium transition-all duration-300 whitespace-nowrap overflow-hidden text-left",
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
          )}>Telegram</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full h-12 rounded-xl transition-all flex items-center overflow-hidden px-0",
            isExpanded ? "justify-start px-3 gap-3" : "justify-center",
            type === "chrome" 
              ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
              : "text-muted-foreground hover:bg-white/5 hover:text-white"
          )}
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Chrome className="w-6 h-6 text-primary" />
          </div>
          <span className={cn(
            "font-medium transition-all duration-300 whitespace-nowrap overflow-hidden text-left",
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
          )}>Chrome</span>
        </Button>
      </div>

      <div className="h-px bg-white/5 mx-4 my-2" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "flex items-center h-12 rounded-xl transition-all duration-200 group relative overflow-hidden px-2",
            isExpanded ? "justify-start gap-3" : "justify-center",
            location === item.href 
              ? "text-white bg-white/5 shadow-inner" 
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}>
            <item.icon className={cn(
              "w-6 h-6 transition-transform duration-300 group-hover:scale-110 shrink-0",
              "text-primary"
            )} />
            <span className={cn(
              "font-medium transition-all duration-300 whitespace-nowrap overflow-hidden text-left",
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            )}>{item.label}</span>
            
            {location === item.href && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center h-12 w-full rounded-xl hover:bg-white/5 transition-colors group overflow-hidden px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/10 shrink-0 flex items-center justify-center" />
          <div className={cn(
            "flex flex-col items-start overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
          )}>
            <span className="text-sm font-medium text-white truncate w-full text-left">Admin</span>
            <span className="text-xs text-muted-foreground truncate w-full text-left">admin@abuse.app</span>
          </div>
          {isExpanded && <LogOut className="w-4 h-4 ml-auto mr-1 text-muted-foreground group-hover:text-red-400" />}
        </button>
      </div>
    </div>
  );
}
