import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <Sparkles className="w-7 h-7" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">DnD Character Forge</h1>
          <p className="text-white/80 text-sm md:text-base">Generate whimsical, ready-to-play characters in a click</p>
        </div>
      </div>
    </header>
  );
}
