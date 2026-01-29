import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Home, Send, Chrome, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { AppIcon } from "@/components/icons/AppIcon";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function Sidebar() {
  const [location] = useLocation();
  const { state, toggleSidebar } = useSidebar();

  const navItems = [
    { icon: Settings, label: "Налаштування", href: "/settings" },
  ];

  const isSettingsActive = location === "/settings";
  const isDashboardActive = location === "/";
  const type: "telegram" | "chrome" = "telegram"; // This could be state-driven

  return (
    <div className={cn(
      "h-screen border-r border-white/5 bg-black/95 flex flex-col shrink-0 transition-all duration-300 relative",
      state === "collapsed" ? "w-16" : "w-20 lg:w-64"
    )}>
      {/* Toggle Button on Right Border */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-50",
          "w-6 h-12 bg-black/90 border border-white/10 rounded-l-lg",
          "flex items-center justify-center text-white/60 hover:text-white/80",
          "transition-all duration-300 hover:bg-black/95 hover:border-white/20",
          "backdrop-blur-sm"
        )}
      >
        {state === "collapsed" ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Header / Logo Area */}
      <div className={cn(
        "h-20 flex items-center justify-center lg:justify-start border-b border-white/5",
        state === "collapsed" ? "" : "lg:pl-[11px]"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20",
          state === "collapsed" ? "ml-[11px]" : ""
        )}>
          <AppIcon className="text-white w-6 h-6" />
        </div>
        <span className={cn(
          "ml-3 font-display font-bold text-lg tracking-wide transition-all duration-300",
          state === "collapsed" ? "hidden" : "hidden lg:block"
        )}>
          Abuse<span className="text-primary">App</span>
        </span>
      </div>

      {/* Farm Type Switcher */}
      <div className={cn(
        "space-y-2 transition-all duration-300",
        state === "collapsed" ? "px-1" : "p-4"
      )}>
        <Link href="/">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-3 h-12 rounded-xl transition-all relative overflow-hidden",
              isDashboardActive && type === "telegram" 
                ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <Send className="w-5 h-5 text-primary" />
            <span className={cn(
              "font-medium transition-all duration-300",
              state === "collapsed" ? "hidden" : "hidden lg:block"
            )}>
              Telegram
            </span>
            {isDashboardActive && type === "telegram" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Button>
        </Link>
        
        <Link href="/chrome">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-3 h-12 rounded-xl transition-all relative overflow-hidden",
              location === "/chrome"
                ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20" 
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <Chrome className="w-5 h-5 text-primary" />
            <span className={cn(
              "font-medium transition-all duration-300",
              state === "collapsed" ? "hidden" : "hidden lg:block"
            )}>
              Chrome
            </span>
            {location === "/chrome" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Button>
        </Link>
      </div>

      <div className={cn(
        "bg-white/5 transition-all duration-300",
        state === "collapsed" ? "mx-1" : "mx-4"
      )}>
        <div className="h-px" />
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 space-y-2 transition-all duration-300",
        state === "collapsed" ? "px-1 py-2" : "p-4"
      )}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
            location === item.href 
              ? "text-white bg-white/5 shadow-inner" 
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}>
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-102",
              "text-primary"
            )} />
            <span className={cn(
              "font-medium transition-all duration-300",
              state === "collapsed" ? "hidden" : "hidden lg:block"
            )}>
              {item.label}
            </span>
            
            {location === item.href && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className={cn(
        "border-t border-white/5 transition-all duration-300",
        state === "collapsed" ? "p-1" : "p-4"
      )}>
        <button className="flex items-center justify-center lg:justify-start gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/10" />
          <div className={cn(
            "flex flex-col items-start overflow-hidden transition-all duration-300",
            state === "collapsed" ? "hidden" : "hidden lg:flex"
          )}>
            <span className="text-sm font-medium text-white truncate w-full">Administrator</span>
            <span className="text-xs text-muted-foreground">admin@abuseapp.io</span>
          </div>
          <LogOut className={cn(
            "w-4 h-4 text-muted-foreground group-hover:text-red-400 transition-all duration-300",
            state === "collapsed" ? "hidden" : "hidden lg:block"
          )} />
        </button>
      </div>
    </div>
  );
}
