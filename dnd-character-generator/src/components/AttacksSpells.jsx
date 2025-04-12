import { useState, useEffect } from 'react';

export function AttacksSpells({ spells = [], attacks = [] }) {
  const [customSpells, setCustomSpells] = useState(spells);
  const [newSpell, setNewSpell] = useState('');

  // Update spells als character opnieuw gegenereerd wordt
  useEffect(() => {
    setCustomSpells(spells);
  }, [spells]);

  const addSpell = () => {
    const cleaned = newSpell.trim();
    if (cleaned !== '' && !customSpells.includes(cleaned)) {
      setCustomSpells([...customSpells, cleaned]);
      setNewSpell('');
    }
  };

  return (
    <div className="p-2 border border-black bg-[#e1d3b8] text-sm ">
      <h2 className="h-60 text-center mb-2 font-bold">Attacks & Spellcasting</h2>
      {/* Attacks */}
      <div className="mb-4">
        <span className="underline">Attacks:</span>
        {attacks.length > 0 ? (
          <ul className="text-left list-disc pl-5">
            {attacks.map(({ name, damage, type, range }, index) => (
              <li key={index}>
                {name} — {damage} {type} ({range})
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-600">No attacks available</p>
        )}
      </div>

      {/* Spells */}
      <div className="mb-2">
        <span className="underline">Spells:</span>
        <ul className="text-left list-disc pl-5">
          {customSpells.length > 0 ? (
            customSpells.map((spell, i) => <li key={i}>{spell}</li>)
          ) : (
            <li className="italic text-gray-600">None</li>
          )}
        </ul>
      </div>

      {/* Spell toevoegen */}
      <div className="flex gap-2 mt-2">
        <input
          value={newSpell}
          onChange={(e) => setNewSpell(e.target.value)}
          placeholder="Add a spell"
          className="w-full p-1 border border-gray-400 rounded text-black"
        />
        <button
          onClick={addSpell}
          className="bg-green-700 text-white px-3 rounded hover:bg-green-800"
        >
          Add
        </button>
      </div>
    </div>
  );
}
