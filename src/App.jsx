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

function characterPrompt(c) {
  return [
    `Portrait of a Level ${c.level} ${c.race} ${c.class} adventurer`,
    `background: ${c.background}, alignment: ${c.alignment}`,
    `traits: ${c.traits.join(", ")}`,
    "fantasy, Dungeons & Dragons style, dramatic lighting, detailed, character concept art, 4k, artstation, trending"
  ].join(", ");
}

async function fetchImageForCharacter(character) {
  const base = import.meta.env.VITE_BACKEND_URL || "";
  const res = await fetch(`${base}/generate-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: characterPrompt(character) }),
  });
  if (!res.ok) throw new Error("Failed to generate image");
  const data = await res.json();
  return data.url;
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
    imageUrl: null,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleGenerate = async (filters) => {
    const c = generateCharacter(filters);
    setCurrent(c);
    setHistory((h) => [c, ...h].slice(0, 20));

    // Generate image in background
    try {
      setLoadingImage(true);
      const url = await fetchImageForCharacter(c);
      setCurrent((prev) => prev && prev.id === c.id ? { ...prev, imageUrl: url } : prev);
      setHistory((h) => h.map((it) => (it.id === c.id ? { ...it, imageUrl: url } : it)));
    } catch (e) {
      // silently ignore for now
      console.warn(e);
    } finally {
      setLoadingImage(false);
    }
  };

  const regenerateImage = async () => {
    if (!current) return;
    try {
      setLoadingImage(true);
      const url = await fetchImageForCharacter(current);
      setCurrent((prev) => (prev ? { ...prev, imageUrl: url } : prev));
      setHistory((h) => h.map((it) => (it.id === current.id ? { ...it, imageUrl: url } : it)));
    } catch (e) {
      console.warn(e);
    } finally {
      setLoadingImage(false);
    }
  };

  const hasHistory = useMemo(() => history.length > 0, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-indigo-950/20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <Controls onGenerate={handleGenerate} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CharacterCard character={current} onGenerateImage={regenerateImage} loadingImage={loadingImage} />
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

      <footer className="py-8 text-center text-sm text-gray-400">
        Built for adventurers. Roll high and have fun!
      </footer>
    </div>
  );
}
