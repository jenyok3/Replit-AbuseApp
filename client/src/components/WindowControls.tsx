import { Minus, Square, X } from "lucide-react";

export function WindowControls() {
  const minimizeWindow = async () => {
    if (window.electronAPI) {
      await window.electronAPI.minimizeWindow();
    }
  };

  const maximizeWindow = async () => {
    if (window.electronAPI) {
      await window.electronAPI.maximizeWindow();
    }
  };

  const closeWindow = async () => {
    if (window.electronAPI) {
      await window.electronAPI.closeWindow();
    }
  };

  return (
    <div className="fixed top-2 right-4 flex gap-1 app-no-drag z-[9999]">
      <button
        onClick={minimizeWindow}
        className="w-6 h-6 flex items-center justify-center rounded transition-colors"
        title="Minimize"
      >
        <Minus className="w-3 h-3 text-white/70 hover:text-white/90 transition-colors" />
      </button>
      <button
        onClick={maximizeWindow}
        className="w-6 h-6 flex items-center justify-center rounded transition-colors"
        title="Maximize"
      >
        <Square className="w-3 h-3 text-white/70 hover:text-white/90 transition-colors" />
      </button>
      <button
        onClick={closeWindow}
        className="w-6 h-6 flex items-center justify-center rounded transition-colors"
        title="Close"
      >
        <X className="w-3 h-3 text-white/70 hover:text-white/90 transition-colors" />
      </button>
    </div>
  );
}
