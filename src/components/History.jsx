import { History } from "lucide-react";

export default function HistoryList({ items, onSelect, onClear }) {
  return (
    <section className="w-full bg-white/70 backdrop-blur rounded-xl border border-black/5 shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <History className="w-4 h-4 text-indigo-600" /> Recent Generations
        </div>
        <button
          onClick={onClear}
          className="text-sm px-3 h-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-600 text-sm">No history yet.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-auto pr-2">
          {items.map((c, idx) => (
            <li key={idx}>
              <button
                onClick={() => onSelect(c)}
                className="w-full text-left px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                <div className="text-sm font-medium text-gray-800">
                  {c.name} • Lv {c.level} {c.race} {c.class}
                </div>
                <div className="text-xs text-gray-600">{c.background} • {c.alignment}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
