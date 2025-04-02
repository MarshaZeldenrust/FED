export function SkillsETC({ stats = {} }) {
  const skills = [
    { name: 'Acrobatics', ability: 'dexterity' },
    { name: 'Animal Handling', ability: 'wisdom' },
    { name: 'Arcana', ability: 'intelligence' },
    { name: 'Athletics', ability: 'strength' },
    { name: 'Deception', ability: 'charisma' },
    { name: 'History', ability: 'intelligence' },
    { name: 'Insight', ability: 'wisdom' },
    { name: 'Intimidation', ability: 'charisma' },
    { name: 'Investigation', ability: 'intelligence' },
    { name: 'Medicine', ability: 'wisdom' },
    { name: 'Nature', ability: 'intelligence' },
    { name: 'Perception', ability: 'wisdom' },
    { name: 'Performance', ability: 'charisma' },
    { name: 'Persuasion', ability: 'charisma' },
    { name: 'Religion', ability: 'intelligence' },
    { name: 'Sleight of Hand', ability: 'dexterity' },
    { name: 'Stealth', ability: 'dexterity' },
    { name: 'Survival', ability: 'wisdom' },
  ];

  const savingThrows = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];

  const getModifier = (score) => {
    if (score === undefined) return '';
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : mod;
  };

  return (
    <div className="flex flex-col gap-2 p-2 border border-black bg-[#e1d3b8] text-xs leading-tight">
      {/* Inspiration */}
      <div className="flex justify-between items-center border p-1 rounded bg-white">
        <label className="font-semibold">Inspiration</label>
        <input type="checkbox" className="w-4 h-4" />
      </div>

      {/* Proficiency Bonus */}
      <div className="flex justify-between items-center border p-1 rounded bg-white">
        <label className="font-semibold">Proficiency Bonus</label>
        <input type="text" className="w-10 text-center border rounded text-xs" value="+2" readOnly />
      </div>

      {/* Saving Throws */}
      <div className="border p-2 rounded bg-white">
        <h4 className="font-bold text-center mb-1">Saving Throws</h4>
        <div className="flex flex-col gap-1">
          {savingThrows.map((ability) => (
            <label key={ability} className="flex items-center gap-2">
              <input type="checkbox" className="shrink-0" />
              <span className="w-6 text-right font-mono">{getModifier(stats[ability])}</span>
              <span className="capitalize">{ability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="border p-2 rounded bg-white">
        <h4 className="font-bold text-center mb-1">Skills</h4>
        <div className="flex flex-col gap-[2px]">
          {skills.map((skill) => (
            <label key={skill.name} className="flex items-center gap-2">
              <input type="checkbox" className="shrink-0" />
              <span className="w-6 text-right font-mono">{getModifier(stats[skill.ability])}</span>
              <span className="flex-grow break-words">
                {skill.name}{' '}
                <span className="text-[10px] text-gray-700">
                  ({skill.ability.slice(0, 3).toUpperCase()})
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
