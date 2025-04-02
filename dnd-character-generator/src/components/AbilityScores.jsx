export default function AbilityScores({ stats = {} }) {
  const abilities = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ];

  return (
    <div className="p-2 border border-black bg-[#e1d3b8] flex flex-col gap-2">
      <h3 className="font-bold text-center text-sm">Ability Scores</h3>
      {abilities.map((ability) => (
        <div
          key={ability}
          className="w-full aspect-square border border-black rounded bg-white flex flex-col justify-between items-center p-1"
        >
          <span className="text-xs font-bold">{ability.toUpperCase()}</span>
          <span className="text-lg font-mono">{stats[ability.toLowerCase()] ?? '-'}</span>
        </div>
      ))}
    </div>
  );
}
