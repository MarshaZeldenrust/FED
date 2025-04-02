// src/components/Health.jsx
import { useState } from 'react';
import { Shield } from 'lucide-react';

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

      {/* Armor Class, Initiative, Speed */}
      <div className="text-center border p-2 rounded font-bold flex flex-col items-center">
  <Shield className="w-5 h-5 mb-1 text-gray-800" />
  Armor Class
  <div className="text-xl font-mono mt-1">{armorClass}</div>
</div>

      <div className="text-center border p-2 rounded font-bold">
        Initiative
        <div className="text-xl font-mono mt-1">{initiative}</div>
      </div>
      <div className="text-center border p-2 rounded font-bold">
        Speed
        <div className="text-xl font-mono mt-1">{speed}</div>
      </div>

      {/* Hit Point Maximum */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Hit Point Maximum</label>
        <input className="w-full border p-1 rounded" type="number" />
      </div>

      {/* Current Hit Points */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Current Hit Points</label>
        <input className="w-full border p-1 rounded" type="number" />
      </div>

      {/* Temporary Hit Points */}
      <div className="col-span-3 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Temporary Hit Points</label>
        <input className="w-full border p-1 rounded" type="number" />
      </div>

       {/* Hit Dice */}
      <div className="col-span-2 border p-2 rounded">
        <label className="block text-xs font-semibold mb-1">Hit Dice</label>
        <input className="w-full border p-1 rounded" type="text" />
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
