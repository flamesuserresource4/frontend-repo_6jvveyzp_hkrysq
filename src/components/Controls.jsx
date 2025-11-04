import { Dice5, Shuffle } from "lucide-react";
import { useState } from "react";

const races = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Gnome",
  "Half-Orc",
  "Half-Elf",
  "Tiefling",
  "Dragonborn",
  "Aasimar",
];

const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

const backgrounds = [
  "Acolyte",
  "Charlatan",
  "Criminal",
  "Entertainer",
  "Folk Hero",
  "Guild Artisan",
  "Hermit",
  "Noble",
  "Outlander",
  "Sage",
  "Sailor",
  "Soldier",
  "Urchin",
];

export default function Controls({ onGenerate }) {
  const [race, setRace] = useState("Any");
  const [charClass, setCharClass] = useState("Any");
  const [background, setBackground] = useState("Any");
  const [level, setLevel] = useState(1);

  const randomizeSelections = () => {
    setRace("Any");
    setCharClass("Any");
    setBackground("Any");
    setLevel(Math.floor(Math.random() * 20) + 1);
  };

  const handleGenerate = () => {
    onGenerate({ race, charClass, background, level });
  };

  const selectOptions = (list) => ["Any", ...list];

  return (
    <section className="w-full bg-white/70 backdrop-blur rounded-xl border border-black/5 shadow-sm p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Race</label>
          <select
            className="h-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={race}
            onChange={(e) => setRace(e.target.value)}
          >
            {selectOptions(races).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Class</label>
          <select
            className="h-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={charClass}
            onChange={(e) => setCharClass(e.target.value)}
          >
            {selectOptions(classes).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Background</label>
          <select
            className="h-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          >
            {selectOptions(backgrounds).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Level</label>
          <input
            type="number"
            min={1}
            max={20}
            className="h-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <button
          onClick={randomizeSelections}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Shuffle className="w-4 h-4" />
          Randomize Filters
        </button>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <Dice5 className="w-4 h-4" />
          Generate Character
        </button>
      </div>
    </section>
  );
}
