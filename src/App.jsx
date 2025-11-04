import { useMemo, useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import CharacterCard from "./components/CharacterCard";
import HistoryList from "./components/History";

function roll4d6DropLowest() {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1).sort((a,b)=>a-b);
  return rolls.slice(1).reduce((a, b) => a + b, 0);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ALIGNMENTS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];

const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

const TRAITS = [
  "Speaks in rhymes when excited",
  "Collects shiny trinkets",
  "Afraid of frogs but won’t admit it",
  "Always writes letters to their mother",
  "Laughs at their own jokes",
  "Has a mysterious family heirloom",
  "Cannot turn down a dare",
  "Keeps a list of life goals in a tiny notebook",
  "Always early, never late",
  "Saves every receipt and note",
];

const HOOKS = [
  "A dream of a burning city keeps repeating—someone with your name calls for help.",
  "You owe a debt to a masked benefactor who demands a favor in return.",
  "A map etched on your palm changes every time you wake up.",
  "You carry a sealed letter addressed to a person no one has heard of.",
  "A talking raven follows you, claiming you’re destined to stop a calamity.",
  "You are the last survivor of a caravan—only you don’t remember the attack.",
];

const RACE_NAMES = {
  Human: ["Arin", "Bryn", "Cade", "Dara", "Evan", "Faye", "Garrick", "Helena", "Iris", "Joren"],
  Elf: ["Aelar", "Lia", "Theren", "Sylvar", "Felosial", "Ielenia", "Varis", "Caelynn"],
  Dwarf: ["Baern", "Eldeth", "Fargrim", "Gunnloda", "Harbek", "Vistra"],
  Halfling: ["Alton", "Cora", "Finnan", "Lidda", "Milo", "Trym"],
  Gnome: ["Boddynock", "Ellyjobell", "Fonkin", "Nissa", "Zook"],
  "Half-Orc": ["Ghak", "Druuk", "Hruk", "Raka", "Shura"],
  "Half-Elf": ["Aldith", "Dain", "Eryn", "Kara", "Lorin"],
  Tiefling: ["Akmenos", "Iados", "Kairon", "Lerissa", "Orianna"],
  Dragonborn: ["Arjhan", "Balasar", "Kava", "Kriv", "Thava"],
  Aasimar: ["Ariel", "Seraphina", "Xander", "Cassiel", "Uriel"],
};

function generateName(race) {
  const pool = RACE_NAMES[race] || ["Alex", "Sam", "Rin", "Kai", "Rowan"];
  const first = pick(pool);
  const last = pick(["Bright", "Storm", "Dark", "Light", "Stone", "Wind"]) + pick(["wood", "walker", "weaver", "born", "brook", "field"]);
  return `${first} ${last}`;
}

function makeStats() {
  const order = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  const base = Object.fromEntries(order.map((k) => [k, roll4d6DropLowest()]));
  return base;
}

function generateCharacter(filters) {
  const races = [
    "Human","Elf","Dwarf","Halfling","Gnome","Half-Orc","Half-Elf","Tiefling","Dragonborn","Aasimar",
  ];
  const classes = [
    "Barbarian","Bard","Cleric","Druid","Fighter","Monk","Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard",
  ];
  const backgrounds = [
    "Acolyte","Charlatan","Criminal","Entertainer","Folk Hero","Guild Artisan","Hermit","Noble","Outlander","Sage","Sailor","Soldier","Urchin",
  ];

  const race = filters.race === "Any" ? pick(races) : filters.race;
  const charClass = filters.charClass === "Any" ? pick(classes) : filters.charClass;
  const background = filters.background === "Any" ? pick(backgrounds) : filters.background;
  const level = Math.min(20, Math.max(1, Number(filters.level) || 1));

  const stats = makeStats();
  const alignment = pick(ALIGNMENTS);
  const skills = Array.from(new Set(Array.from({ length: 4 }, () => pick(SKILLS))));
  const traits = Array.from(new Set([pick(TRAITS), pick(TRAITS)]));
  const name = generateName(race);
  const hook = pick(HOOKS);

  return {
    id: crypto.randomUUID(),
    name,
    race,
    class: charClass,
    background,
    level,
    alignment,
    stats,
    skills,
    traits,
    hook,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = (filters) => {
    const c = generateCharacter(filters);
    setCurrent(c);
    setHistory((h) => [c, ...h].slice(0, 20));
  };

  const hasHistory = useMemo(() => history.length > 0, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <Controls onGenerate={handleGenerate} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CharacterCard character={current} />
          </div>
          <div>
            <HistoryList
              items={history}
              onSelect={(c) => setCurrent(c)}
              onClear={() => setHistory([])}
            />
          </div>
        </div>

        {hasHistory ? (
          <div className="text-center text-gray-500 text-sm">Tip: Click items in the list to view previous heroes.</div>
        ) : (
          <div className="text-center text-gray-500 text-sm">Set filters and press Generate to forge your first hero.</div>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-gray-600">
        Built for adventurers. Roll high and have fun!
      </footer>
    </div>
  );
}
