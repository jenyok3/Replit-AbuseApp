import { useStats } from "@/hooks/use-dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Activity, ShieldCheck, Ban } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsPanel() {
  const { data: stats, isLoading } = useStats();

  const chartData = [
    { name: "Live", value: stats?.liveAccounts || 0, color: "#22c55e" },
    { name: "Blocked", value: stats?.blockedAccounts || 0, color: "#ef4444" },
  ];

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-3xl bg-card/20" />;
  }

  const livePercent = stats?.livePercent || 0;

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col h-full">
      <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
        <Activity className="text-primary w-6 h-6" />
        Статистика акаунтів
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#000", borderColor: "#333", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold font-mono text-white">{livePercent}%</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Live</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center gap-4 min-w-[180px]">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <ShieldCheck className="text-green-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{stats?.liveAccounts}</div>
              <div className="text-xs text-muted-foreground uppercase">Активні</div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center gap-4 min-w-[180px]">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Ban className="text-red-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{stats?.blockedAccounts}</div>
              <div className="text-xs text-muted-foreground uppercase">Заблоковані</div>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center gap-4 min-w-[180px]">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="text-primary w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{stats?.totalAccounts}</div>
              <div className="text-xs text-muted-foreground uppercase">Всього</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
