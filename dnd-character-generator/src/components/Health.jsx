import { useState } from 'react';

export default function Health({ armorClass = 10, initiative = 2, speed = 30 }) {
  const [deathSaves, setDeathSaves] = useState({
    successes: [false, false, false],
    failures: [false, false, false],
  });

  const toggleSave = (type, index) => {
    setDeathSaves((prev) => ({
      ...prev,
      [type]: prev[type].map((val, i) => (i === index ? !val : val)),
    }));
  };

  return (
    <section className="grid grid-cols-3 gap-2 border p-4 rounded shadow bg-white">
   {/* Armor Class */}
<div className="text-center border p-2 rounded font-bold flex flex-col items-center">
  <div className="w-12 h-14 bg-white border-2 border-black rounded-b-full flex items-center justify-center">
    <span className="text-lg font-mono">{armorClass}</span>
  </div>
  <div className="text-xs mt-1">Armor Class</div>
</div>

{/* Initiative */}
<div className="flex flex-col items-center border p-2 rounded font-bold">
  <div className="w-12 h-14 flex items-center justify-center border-2 border-black rounded">
    <span className="text-lg font-mono">{initiative}</span>
  </div>
  <div className="text-xs mt-1">Initiative</div>
</div>

{/* Speed */}
<div className="flex flex-col items-center border p-2 rounded font-bold">
  <div className="w-12 h-14 flex items-center justify-center border-2 border-black rounded">
    <span className="text-lg font-mono">{speed}</span>
  </div>
  <div className="text-xs mt-1">Speed</div>
</div>

      {/* HP max */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Hit Point Maximum</label>
        <input
  type="number"
  placeholder="0"
  className="w-full border p-1 rounded"
/>

      </div>

      {/* Current HP */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Current Hit Points</label>
        <input
  type="number"
  placeholder="0"
  className="w-full border p-1 rounded"
/>

      </div>

      {/* Temporary HP */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Temporary Hit Points</label>
        <input
  type="number"
  placeholder="0"
  className="w-full border p-1 rounded"
/>

      </div>

      {/* Hit Dice */}
      <div className="col-span-2 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Hit Dice</label>
        <input
  type="number"
  placeholder="0"
  className="w-full border p-1 rounded"
/>

      </div>

      {/* Death Saves */}
      <div className="border p-2 rounded text-xs">
        <label className="block text-sm font-semibold mb-1">Death Saves</label>
        <div className="mb-1">
          <div>Successes</div>
          <div className="flex gap-1 mt-1">
            {deathSaves.successes.map((active, i) => (
              <div
                key={`success-${i}`}
                onClick={() => toggleSave('successes', i)}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  active ? 'bg-black' : ''
                }`}
              />
            ))}
          </div>
        </div>
        <div>
          <div>Failures</div>
          <div className="flex gap-1 mt-1">
            {deathSaves.failures.map((active, i) => (
              <div
                key={`failure-${i}`}
                onClick={() => toggleSave('failures', i)}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  active ? 'bg-black' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
