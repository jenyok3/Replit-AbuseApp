import { Sidebar } from "@/components/Sidebar";
import { LaunchPanel } from "@/components/LaunchPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { DailyTasksPanel } from "@/components/DailyTasksPanel";
import { LogsPanel } from "@/components/LogsPanel";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-body">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6 relative">
        {/* Background ambient effects */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto h-full flex flex-col gap-6">
          
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[420px]">
            {/* Launch Panel - Takes 7 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 h-full"
            >
              <LaunchPanel />
            </motion.div>

            {/* Stats Panel - Takes 5 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-5 h-full"
            >
              <StatsPanel />
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[300px]">
            {/* Logs & Add Project - Takes 8 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-8 h-full"
            >
              <LogsPanel />
            </motion.div>

            {/* Daily Tasks - Takes 4 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-4 h-full"
            >
              <DailyTasksPanel />
            </motion.div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
