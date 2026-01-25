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

  const [accountsPerBatch, setAccountsPerBatch] = useState<string>("");
  const [accountsFolderPath, setAccountsFolderPath] = useState<string>("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setAccountsPerBatch(String(settings.accountsPerBatch));
      setAccountsFolderPath(settings.accountsFolderPath);
    }
  }, [settings]);

  useEffect(() => {
    if (settings) {
      const changed = 
        accountsPerBatch !== String(settings.accountsPerBatch) || 
        accountsFolderPath !== settings.accountsFolderPath;
      setHasChanges(changed);
    }
  }, [accountsPerBatch, accountsFolderPath, settings]);

  const handleSave = () => {
    mutation.mutate({
      accountsPerBatch: parseInt(accountsPerBatch) || 1,
      accountsFolderPath,
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 space-y-6"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountsPerBatch" className="text-sm font-medium text-zinc-400">
                Кількість акаунтів для відкриття за раз
              </Label>
              <div className="relative group">
                <Input
                  id="accountsPerBatch"
                  type="number"
                  value={accountsPerBatch}
                  onChange={(e) => setAccountsPerBatch(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                />
                {hasChanges && (
                   <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                   >
                     <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-primary hover:bg-primary/10"
                      onClick={handleSave}
                     >
                       <Check className="h-5 w-5" />
                     </Button>
                   </motion.div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="folderPath" className="text-sm font-medium text-zinc-400">
                Шлях до папки з акаунтами
              </Label>
              <div className="relative group">
                <Input
                  id="folderPath"
                  value={accountsFolderPath}
                  onChange={(e) => setAccountsFolderPath(e.target.value)}
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-primary/50 transition-all pl-4"
                  placeholder="C:\Users\Admin\Documents\Accounts"
                />
                {hasChanges && (
                   <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                   >
                     <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-primary hover:bg-primary/10"
                      onClick={handleSave}
                     >
                       <Check className="h-5 w-5" />
                     </Button>
                   </motion.div>
                )}
              </div>
            </div>
          </div>

          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <Button 
                onClick={handleSave}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Зберегти зміни
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
