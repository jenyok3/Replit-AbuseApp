import { Sidebar } from "@/components/Sidebar";
import { LaunchPanel } from "@/components/LaunchPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { DailyTasksPanel } from "@/components/DailyTasksPanel";
import { LogsPanel, AddProjectDialog } from "@/components/LogsPanel";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-body">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8 relative">
        {/* Background ambient effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto h-full grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 content-stretch">
          
          {/* Left Main Column */}
          <div className="flex flex-col gap-6 min-h-0">
            {/* Main Top Widget - Full Width (Launch Panel) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-none"
            >
              <LaunchPanel />
            </motion.div>

            {/* Bottom Row - 2 Widgets */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-end min-h-0">
              {/* Logs Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="h-full min-h-0 flex flex-col"
              >
                <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 flex flex-col h-full min-h-0">
                  <LogsPanel hideAddProject />
                </div>
              </motion.div>
              
              {/* Square Widget (Add Project) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full flex justify-end"
              >
                <AddProjectWidget />
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar Column - Stats & Daily */}
          <div className="flex flex-col gap-6 items-stretch h-full min-h-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex-none"
            >
              <StatsPanel />
            </motion.div>

            {/* Daily Widget moved here */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex-1 min-h-0"
            >
              <DailyTasksPanel />
            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}

function AddProjectWidget() {
  return (
    <div className="aspect-square w-[200px]">
      <AddProjectDialog variant="widget" />
    </div>
  );
}
