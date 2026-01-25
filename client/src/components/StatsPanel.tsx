import { useStats } from "@/hooks/use-dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Activity } from "lucide-react";
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

      <div className="flex items-center justify-center flex-1">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={40}
                outerRadius={55}
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
            <span className="text-2xl font-bold font-mono text-white">{livePercent}%</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
