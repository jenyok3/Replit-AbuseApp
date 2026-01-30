"use client"

import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { WindowControls } from "@/components/WindowControls";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Settings from "@/pages/Settings";
import Chrome from "@/pages/Chrome";
import NotFound from "@/pages/not-found";

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
