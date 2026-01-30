"use client"

import dynamic from "next/dynamic";
import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";

// Dynamic imports to avoid SSR issues with localStorage
const Sidebar = dynamic(() => import("@/components/Sidebar").then(mod => ({ default: mod.Sidebar })), { ssr: false });
const WindowControls = dynamic(() => import("@/components/WindowControls").then(mod => ({ default: mod.WindowControls })), { ssr: false });
const Dashboard = dynamic(() => import("@/pages/Dashboard"), { ssr: false });
const Accounts = dynamic(() => import("@/pages/Accounts"), { ssr: false });
const Settings = dynamic(() => import("@/pages/Settings"), { ssr: false });
const Chrome = dynamic(() => import("@/pages/Chrome"), { ssr: false });
const NotFound = dynamic(() => import("@/pages/not-found"), { ssr: false });

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/projects" component={Dashboard} />
      <Route path="/chrome" component={Chrome} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden bg-black">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Router />
            </div>
          </div>
          <WindowControls />
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
