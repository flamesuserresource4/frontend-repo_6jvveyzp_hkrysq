import Spline from "@splinetool/react-spline";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlays to improve text contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      <div className="pointer-events-none relative z-10 h-full flex items-end">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-8 pb-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight">DnD Character Forge</h1>
              <p className="text-white/85 text-sm md:text-base">Interactive 3D flair + instant hero generation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
