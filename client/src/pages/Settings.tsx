import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { queryClient } from "@/lib/queryClient";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Settings as SettingsIcon, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery<any>({
    queryKey: [api.settings.get.path],
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: any) => {
      const res = await fetch(api.settings.update.path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.settings.get.path] });
      toast({
        title: "Налаштування збережено",
        description: "Ваші зміни успішно застосовані.",
      });
    },
  });

  const [telegramThreads, setTelegramThreads] = useState<string>("");
  const [telegramFolderPath, setTelegramFolderPath] = useState<string>("");
  const [chromeThreads, setChromeThreads] = useState<string>("");
  const [chromeFolderPath, setChromeFolderPath] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setTelegramThreads(String(settings.telegramThreads || "1"));
      setTelegramFolderPath(settings.telegramFolderPath || "");
      setChromeThreads(String(settings.chromeThreads || "1"));
      setChromeFolderPath(settings.chromeFolderPath || "");
    }
  }, [settings]);

  useEffect(() => {
    if (settings) {
      const changed = 
        telegramThreads !== String(settings.telegramThreads) || 
        telegramFolderPath !== settings.telegramFolderPath ||
        chromeThreads !== String(settings.chromeThreads) ||
        chromeFolderPath !== settings.chromeFolderPath;
      setHasChanges(changed);
    }
  }, [telegramThreads, telegramFolderPath, chromeThreads, chromeFolderPath, settings]);

  const handleSave = () => {
    mutation.mutate({
      telegramThreads: parseInt(telegramThreads) || 1,
      telegramFolderPath,
      chromeThreads: parseInt(chromeThreads) || 1,
      chromeFolderPath,
    });
  };

  if (isLoading) return null;

  return (
    <div className="flex-1 overflow-hidden relative font-body text-white">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <SettingsIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Налаштування</h1>
            <p className="text-muted-foreground">Керування параметрами системи</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Telegram Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 space-y-6"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Налаштування Telegram
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telegramThreads" className="text-sm font-medium text-zinc-400">
                  Кількість потоків
                </Label>
                <Input
                  id="telegramThreads"
                  type="number"
                  value={telegramThreads}
                  onChange={(e) => setTelegramThreads(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegramFolderPath" className="text-sm font-medium text-zinc-400">
                  Шлях до папки з акаунтами
                </Label>
                <Input
                  id="telegramFolderPath"
                  value={telegramFolderPath}
                  onChange={(e) => setTelegramFolderPath(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                  placeholder="C:\Users\Admin\Documents\TelegramAccounts"
                />
              </div>
            </div>
          </motion.div>

          {/* Chrome Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 space-y-6"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Налаштування Chrome
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chromeThreads" className="text-sm font-medium text-zinc-400">
                  Кількість потоків
                </Label>
                <Input
                  id="chromeThreads"
                  type="number"
                  value={chromeThreads}
                  onChange={(e) => setChromeThreads(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chromeFolderPath" className="text-sm font-medium text-zinc-400">
                  Шлях до папки з акаунтами
                </Label>
                <Input
                  id="chromeFolderPath"
                  value={chromeFolderPath}
                  onChange={(e) => setChromeFolderPath(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                  placeholder="C:\Users\Admin\Documents\ChromeAccounts"
                />
              </div>
            </div>
          </motion.div>

          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <Button 
                onClick={handleSave}
                disabled={mutation.isPending}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {mutation.isPending ? "Збереження..." : "Зберегти зміни"}
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
