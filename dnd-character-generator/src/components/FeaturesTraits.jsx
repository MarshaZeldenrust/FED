import { useState } from 'react';

export function FeaturesTraits({ raceTraits = [], classTraits = [], customTraits = [], setCustomTraits }) {
  const [input, setInput] = useState('');

  const addTrait = () => {
    if (input.trim() === '') return;
    setCustomTraits([...customTraits, input.trim()]);
    setInput('');
  };

  return (
    <div className="h-133 p-4 border rounded border-black bg-[#e1d3b8] text-sm">
      <h3 className="eagle-lake-regular text-xl mb-4">Features & Traits</h3>

      <div className="text-left mb-5">
        <strong>Race Traits:</strong>
        <ul className="list-disc list-inside">
          {raceTraits.length > 0 ? raceTraits.map((trait, idx) => (
            <li key={`race-${idx}`}>{trait}</li>
          )) : <li>None</li>}
        </ul>
      </div>

      <div className="text-left mb-5">
        <strong>Class Features:</strong>
        <ul className="list-disc list-inside">
          {classTraits.length > 0 ? classTraits.map((feat, idx) => (
            <li key={`class-${idx}`}>{feat}</li>
          )) : <li>None</li>}
        </ul>
      </div>

      <div className="text-left mb-3">
        <strong>Extra:</strong>
        <ul className="list-disc list-inside mb-2">
          {customTraits.length > 0 ? customTraits.map((trait, idx) => (
            <li key={`custom-${idx}`}>{trait}</li>
          )) : <li>Add extra traits</li>}
        </ul>
        <div className="flex gap-2 mt-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Voeg eigen trait toe..."
            className="bg-white flex-grow border rounded p-1 text-xs"
          />
          <button
            onClick={addTrait}
            className="bg-black text-white text-xs px-2 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
