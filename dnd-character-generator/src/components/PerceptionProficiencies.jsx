import { useState, useEffect } from 'react';

export function PerceptionProficiencies({
  wisdomScore,
  isProficientInPerception = false,
  proficiencyBonus = 0,
  languages = [],
  otherProficiencies = [],
}) {
  const [passivePerception, setPassivePerception] = useState(10);

  useEffect(() => {
    if (typeof wisdomScore === 'number') {
      const wisdomModifier = Math.floor((wisdomScore - 10) / 2);
      const calculated = 10 + wisdomModifier + (isProficientInPerception ? proficiencyBonus : 0);

      console.log("📊 Berekening Passive Perception:");
      console.log(` - Wisdom Score: ${wisdomScore}`);
      console.log(` - Wisdom Modifier: ${wisdomModifier}`);
      console.log(` - Proficient in Perception: ${isProficientInPerception}`);
      console.log(` - Proficiency Bonus: ${proficiencyBonus}`);
      console.log(`✅ Passive Perception = ${calculated}`);
      console.log('-----------------------------');

      setPassivePerception(calculated);
    }
  }, [wisdomScore, isProficientInPerception, proficiencyBonus]);

  return (
    <div className="p-4 bg-[#e1d3b8] border border-black rounded">
     <div className="mb-3 relative group">
  <strong className="cursor-help">
    Passive Wisdom (Perception):
  </strong>

  <div className="text-left absolute left-1/2 -translate-x-1/2 mt-1 w-64 text-xs text-white bg-gray-900 p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-pre-line">
    {`📊 Berekening Passive Perception:
- Wisdom Modifier (Wisdom - 10 / 2): (${wisdomScore} - 10) / 2 = ${Math.floor((wisdomScore - 10) / 2)}
- Proficient in Perception: ${isProficientInPerception ? 'ja' : 'nee'}
- Totale Passive Perception Bonus: ${proficiencyBonus >= 0 ? '+' : ''}${proficiencyBonus}
✅ Passive Perception = 10 + ${Math.floor((wisdomScore - 10) / 2)}${isProficientInPerception ? ` + ${proficiencyBonus}` : ''} = ${passivePerception}`}
  </div>

  <div className="border p-2 text-center bg-white">
    {passivePerception}
  </div>
</div>

      <div className="mb-3">
        <strong>Languages:</strong>
        <div className="border p-2 bg-white">
          {languages.length > 0 ? languages.join(', ') : <span>No languages available</span>}
        </div>
      </div>

      <div className="mb-1">
        <strong>Other Proficiencies:</strong>
        <div className="border p-2 bg-white">
          {otherProficiencies.length > 0 ? otherProficiencies.join(', ') : <span>None</span>}
        </div>
      </div>
    </div>
  );
}
