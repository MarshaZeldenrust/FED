import { useState, useEffect } from 'react';

export function PerceptionProficiencies({ wisdomScore, languages = [] }) {
  const [passivePerception, setPassivePerception] = useState(0);

  // Bereken de Passive Perception op basis van de Wisdom score
  useEffect(() => {
    const wisMod = Math.floor((wisdomScore - 10) / 2);
    const calculatedPassivePerception = 10 + wisMod;
    setPassivePerception(calculatedPassivePerception);
  }, [wisdomScore]);

  return (
    <div className="p-4 bg-[#e1d3b8] border border-black">
      <div className="mb-2">
        <strong>Passive Wisdom (Perception):</strong>
        <div className="border p-2 text-center">{passivePerception}</div>
      </div>

      <div className="mb-2">
        <strong>Languages:</strong>
        <div className="border p-2">
          {languages.length > 0 ? (
            languages.join(', ')
          ) : (
            <span>No languages available</span>
          )}
        </div>
      </div>

      <div className="mb-2">
        <strong>Other Proficiencies:</strong>
        <div className="border p-2">
          {/* Voeg hier je andere proficiencies toe */}
          <span>Cooking Set, Thieves' Tools, etc.</span>
        </div>
      </div>
    </div>
  );
}
