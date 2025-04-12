import { useState } from 'react';

export function FeaturesTraits({ raceTraits = [], classTraits = [], customTraits = [], setCustomTraits }) {
  const [input, setInput] = useState('');

  const addTrait = () => {
    if (input.trim() === '') return;
    setCustomTraits([...customTraits, input.trim()]);
    setInput('');
  };

  return (
    <div className="h-132 p-4 border border-black bg-[#e1d3b8] text-sm">
      <h3 className="font-bold text-lg mb-2">Features & Traits</h3>

      <div className="text-left mb-5">
        <strong>🧝‍♂️ Race Traits:</strong>
        <ul className="list-disc list-inside">
          {raceTraits.length > 0 ? raceTraits.map((trait, idx) => (
            <li key={`race-${idx}`}>{trait}</li>
          )) : <li>Geen</li>}
        </ul>
      </div>

      <div className="text-left mb-5">
        <strong>🛡️ Class Features:</strong>
        <ul className="list-disc list-inside">
          {classTraits.length > 0 ? classTraits.map((feat, idx) => (
            <li key={`class-${idx}`}>{feat}</li>
          )) : <li>Geen</li>}
        </ul>
      </div>

      <div className="text-left mb-3">
        <strong>✍️ Extra:</strong>
        <ul className="list-disc list-inside mb-2">
          {customTraits.length > 0 ? customTraits.map((trait, idx) => (
            <li key={`custom-${idx}`}>{trait}</li>
          )) : <li>Voeg hier zelf extra traits toe</li>}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Voeg eigen trait toe..."
            className="flex-grow border rounded p-1 text-xs"
          />
          <button
            onClick={addTrait}
            className="bg-black text-white text-xs px-2 py-1 rounded"
          >
            Voeg toe
          </button>
        </div>
      </div>
    </div>
  );
}
