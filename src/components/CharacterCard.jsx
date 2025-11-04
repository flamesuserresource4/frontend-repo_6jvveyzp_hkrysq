import { User, Swords, Shield, Scroll } from "lucide-react";

function StatBadge({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-md border border-gray-200 p-3">
      <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-lg font-bold text-gray-800">{value}</span>
    </div>
  );
}

export default function CharacterCard({ character }) {
  if (!character) {
    return (
      <div className="w-full text-center text-gray-600 py-10">No character yet. Click Generate to forge a hero!</div>
    );
  }

  const { name, race, class: clazz, background, alignment, level, stats, traits, skills } = character;

  return (
    <section className="w-full bg-white rounded-xl border border-black/5 shadow p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow">
            {name.split(" ").map((p) => p[0]).join("").slice(0,2)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" /> {name}
            </h2>
            <p className="text-gray-600">Level {level} {race} {clazz} • {background} • {alignment}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6">
        {Object.entries(stats).map(([k, v]) => (
          <StatBadge key={k} label={k} value={v} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
            <Swords className="w-4 h-4 text-indigo-600" /> Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-2 py-1 text-sm rounded border border-gray-200 bg-gray-50 text-gray-700">{s}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
            <Shield className="w-4 h-4 text-indigo-600" /> Traits
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {traits.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-indigo-900">
        <div className="flex items-center gap-2 font-semibold mb-1">
          <Scroll className="w-4 h-4" /> Adventure Hook
        </div>
        <p className="text-sm">{character.hook}</p>
      </div>
    </section>
  );
}
