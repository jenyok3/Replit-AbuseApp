import { useState } from "react";
import { useDailyTasks, useCreateDailyTask, useToggleDailyTask, useDeleteDailyTask } from "@/hooks/use-dashboard";
import { CheckSquare, Plus, Trash2, Check, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DailyTasksPanel() {
  const { data: tasks, isLoading } = useDailyTasks();
  const { mutate: createTask, isPending: isCreating } = useCreateDailyTask();
  const { mutate: toggleTask } = useToggleDailyTask();
  const { mutate: deleteTask } = useDeleteDailyTask();
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    createTask({ title: newTaskTitle }, {
      onSuccess: () => setNewTaskTitle("")
    });
  };

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <CheckSquare className="text-primary w-5 h-5" />
          Daily
        </h2>
        <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
          {tasks?.filter(t => t.isCompleted).length || 0} / {tasks?.length || 0}
        </span>
      </div>
      
      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-2 pb-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground text-sm">Loading tasks...</div>
          ) : tasks?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm opacity-50">No daily tasks set.</div>
          ) : (
            tasks?.map((task) => (
              <div 
                key={task.id} 
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <Checkbox 
                  checked={task.isCompleted || false}
                  onCheckedChange={(checked) => toggleTask({ id: task.id, isCompleted: checked as boolean })}
                  className="w-5 h-5 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className={cn(
                  "flex-1 text-sm transition-all duration-300",
                  task.isCompleted ? "text-muted-foreground line-through decoration-primary/50" : "text-white"
                )}>
                  {task.title}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleCreate} className="mt-4 flex gap-2">
        <Input 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task..."
          className="bg-black/50 border-white/10 text-sm h-10"
        />
        <Button 
          type="submit" 
          disabled={isCreating || !newTaskTitle.trim()}
          size="icon"
          className="h-10 w-10 shrink-0 bg-white/10 hover:bg-primary hover:text-white"
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}
