import { LaunchPanel } from "@/components/LaunchPanel";
import { StatsPanel } from "@/components/StatsPanel";
import { DailyTasksPanel } from "@/components/DailyTasksPanel";
import { LogsPanel, AddProjectDialog } from "@/components/LogsPanel";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";

export default function Dashboard() {
  const [layoutMode, setLayoutMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [containerWidth, setContainerWidth] = useState(0);

  // Monitor container width to determine layout mode
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log('🪟 Window width changed to:', width);
      setContainerWidth(width);
      
      // Determine layout mode based on width
      let newLayoutMode: 'desktop' | 'tablet' | 'mobile';
      if (width >= 1300) { // Changed from 1400 to 1300
        newLayoutMode = 'desktop';
      } else if (width >= 768) {
        newLayoutMode = 'tablet';
      } else {
        newLayoutMode = 'mobile';
      }
      
      console.log('🎯 Determined layout mode:', newLayoutMode);
      setLayoutMode(newLayoutMode);
    };

    // Only set initial layout mode, don't listen for resize
    // Electron will handle window sizing
    handleResize();
    
    return () => {
      // No cleanup needed since we're not adding event listener
    };
  }, []);

  // Function to adjust widget heights to match AddProject square
  const adjustWidgetHeights = () => {
    console.log('🔧 adjustWidgetHeights called');
    
    const addProjectElement = document.querySelector('[data-add-project-widget]') as HTMLElement;
    console.log('📦 AddProject element found:', !!addProjectElement);
    
    if (!addProjectElement) {
      console.log('❌ AddProject element not found!');
      return;
    }

    // Force a small delay to ensure the element is rendered
    setTimeout(() => {
      const addProjectHeight = addProjectElement.offsetHeight;
      console.log('📏 AddProject height:', addProjectHeight); // Debug log
      
      // Get the bottom position of AddProject widget
      const addProjectRect = addProjectElement.getBoundingClientRect();
      const addProjectBottom = addProjectRect.bottom;
      console.log('📍 AddProject bottom position:', addProjectBottom);
      
      // Adjust Daily widget height to match the bottom line
      const dailyContainer = document.querySelector('[data-daily-widget]') as HTMLElement;
      console.log('📅 Daily element found:', !!dailyContainer);
      
      if (dailyContainer) {
        const dailyRect = dailyContainer.getBoundingClientRect();
        const dailyTop = dailyRect.top;
        const neededHeight = addProjectBottom - dailyTop;
        
        console.log('📍 Daily top position:', dailyTop);
        console.log('📏 Daily needed height:', neededHeight);
        
        dailyContainer.style.height = `${neededHeight}px`;
        dailyContainer.style.minHeight = `${neededHeight}px`;
        console.log('✅ Daily height set to:', neededHeight); // Debug log
      } else {
        console.log('❌ Daily element not found!');
      }
      
      // Keep Logs widget at the same height as AddProject (square)
      const logsContainer = document.querySelector('[data-logs-widget]') as HTMLElement;
      console.log('📋 Logs element found:', !!logsContainer);
      
      if (logsContainer) {
        logsContainer.style.height = `${addProjectHeight}px`;
        logsContainer.style.minHeight = `${addProjectHeight}px`;
        console.log('✅ Logs height set to:', addProjectHeight); // Debug log
      } else {
        console.log('❌ Logs element not found!');
      }
    }, 50);
  };

  // Use effect to adjust heights after mount and on resize
  useEffect(() => {
    console.log('🚀 useEffect setup for layoutMode:', layoutMode);
    
    // Multiple attempts with longer delays to ensure proper sizing
    const timers = [
      setTimeout(() => {
        console.log('⏰ Timer 1: 200ms');
        adjustWidgetHeights();
      }, 200),
      setTimeout(() => {
        console.log('⏰ Timer 2: 500ms');
        adjustWidgetHeights();
      }, 500),
      setTimeout(() => {
        console.log('⏰ Timer 3: 800ms');
        adjustWidgetHeights();
      }, 800),
      setTimeout(() => {
        console.log('⏰ Timer 4: 1200ms');
        adjustWidgetHeights();
      }, 1200)
    ];

    // Remove resize listener to prevent infinite loop
    // The window is already auto-sized by Electron
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [layoutMode]);

  // Window control functions for custom title bar
  const minimizeWindow = () => {
    if (window.electronAPI) {
      window.electronAPI.minimize();
    }
  };

  const maximizeWindow = () => {
    if (window.electronAPI) {
      window.electronAPI.maximize();
    }
  };

  const closeWindow = () => {
    if (window.electronAPI) {
      window.electronAPI.close();
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative font-body text-white">
      {/* Background ambient effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-[1920px] mx-auto h-full p-4 md:p-6 lg:p-8 responsive-container main-container prevent-overflow">
        {/* Custom Window Controls */}
        <div className="absolute top-2 right-2 z-50 flex gap-1">
          <button
            onClick={minimizeWindow}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors"
            title="Minimize"
          >
            <Minus className="w-4 h-4 text-yellow-400" />
          </button>
          <button
            onClick={maximizeWindow}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors"
            title="Maximize"
          >
            <Square className="w-4 h-4 text-green-400" />
          </button>
          <button
            onClick={closeWindow}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
        
        {/* Layout Mode Indicator - for testing */}
        <div className="absolute top-2 left-2 z-50 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-white/70">
          {layoutMode === 'desktop' ? '🖥️ Desktop' : layoutMode === 'tablet' ? '📱 Tablet' : '📱 Mobile'} ({containerWidth}px)
        </div>
        
        {layoutMode === 'desktop' ? (
          // Desktop Layout - original 2-column layout
          <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 content-stretch items-stretch layout-transition grid-container">
            
            {/* Left Main Column */}
            <div className="flex flex-col gap-6 h-full min-h-0">
              {/* Main Top Widget - Full Width (Launch Panel) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-none widget-hover"
              >
                <LaunchPanel />
              </motion.div>

              {/* Bottom Row - 2 Widgets - Natural height without pressure */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6 items-end">
                {/* Logs Widget - Natural height based on content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col"
                  data-logs-widget
                >
                  <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 flex flex-col overflow-hidden">
                    <LogsPanel hideAddProject />
                  </div>
                </motion.div>
                
                {/* Square Widget (Add Project) - True square */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="aspect-square flex-shrink-0 widget-hover"
                  data-add-project-widget
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
                className="flex-none widget-hover"
              >
                <StatsPanel />
              </motion.div>

              {/* Daily Widget - Natural height without pressure */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="widget-hover overflow-hidden"
                data-daily-widget
              >
                <DailyTasksPanel />
              </motion.div>
            </div>
          </div>
        ) : layoutMode === 'tablet' ? (
          // Tablet Layout - Launch Panel full width, Stats & Daily side by side below, then Logs & Add Project
          <div className="h-full overflow-y-auto smooth-scroll custom-scrollbar">
            <div className="flex flex-col gap-6 min-h-full grid-container">
              
              {/* Launch Panel - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex-shrink-0 widget-hover"
              >
                <LaunchPanel />
              </motion.div>

              {/* Stats & Daily Panels - Side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full grid-container">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="w-full h-[250px] min-widget-size widget-hover widget-responsive"
                >
                  <StatsPanel />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full h-[250px] min-widget-size widget-hover widget-responsive"
                >
                  <DailyTasksPanel />
                </motion.div>
              </div>

              {/* Logs & Add Project - Side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6 w-full grid-container">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-full h-[250px] widget-hover"
                >
                  <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 h-full custom-scrollbar overflow-hidden">
                    <LogsPanel hideAddProject />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="w-[250px] h-[250px] flex-shrink-0 widget-hover"
                  data-add-project-widget
                >
                  <AddProjectWidget />
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Layout - Everything stacked vertically
          <div className="h-full overflow-y-auto smooth-scroll custom-scrollbar">
            <div className="flex flex-col gap-4 min-h-full grid-container">
              
              {/* Launch Panel - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex-shrink-0 widget-hover"
              >
                <LaunchPanel />
              </motion.div>

              {/* Stats Panel - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-full h-[350px] min-widget-size widget-hover widget-responsive"
              >
                <StatsPanel />
              </motion.div>

              {/* Daily Tasks Panel - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full h-[250px] min-widget-size widget-hover widget-responsive"
              >
                <DailyTasksPanel />
              </motion.div>

              {/* Add Project Widget - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-full h-[250px] widget-hover"
                data-add-project-widget
              >
                <AddProjectWidget />
              </motion.div>

              {/* Logs Panel - Full width */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-full h-[250px] widget-hover"
              >
                <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 h-full custom-scrollbar overflow-hidden">
                  <LogsPanel hideAddProject />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function AddProjectWidget() {
  return (
    <div className="h-full w-full">
      <AddProjectDialog variant="widget" />
    </div>
  );
}
