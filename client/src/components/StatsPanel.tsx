import { useStats } from "@/hooks/use-dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Activity, ShieldCheck, Ghost, Layers } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsPanel() {
  const { data: stats, isLoading } = useStats();

  const chartData = [
    { name: "Live", value: stats?.liveAccounts || 0, color: "#22c55e" },
    { name: "Blocked", value: stats?.blockedAccounts || 0, color: "#64748b" },
  ];

  if (isLoading) {
    return <Skeleton className="h-full w-full rounded-3xl bg-card/20" />;
  }

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col h-full">
      <h2 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2 whitespace-nowrap">
        <Activity className="text-primary w-5 h-5 shrink-0" />
        Статистика акаунтів
      </h2>

      <div className="flex items-center justify-center flex-1 gap-8">
        <div className="relative w-32 h-32 shrink-0">
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
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold font-mono text-white">{stats?.liveAccounts || 0}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <span className="text-xl font-mono font-bold text-white">{stats?.totalAccounts || 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-xl font-mono font-bold text-white">{stats?.liveAccounts || 0}</span>
          </div>
          <div className="flex items-center gap-3">
            <Ghost className="w-5 h-5 text-slate-400" />
            <span className="text-xl font-mono font-bold text-white">{stats?.blockedAccounts || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
