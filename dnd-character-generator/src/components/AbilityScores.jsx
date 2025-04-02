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
    <div className="p-2 border border-black bg-[#e1d3b8]">
      <h3 className="font-bold mb-2 text-center">Ability Scores</h3>
      <div className="flex flex-col gap-2">
        {abilities.map((ability) => (
          <div key={ability} className="flex justify-between items-center">
            <label className="font-medium">{ability}</label>
            <input
              type="text"
              value={stats[ability.toLowerCase()] ?? ''}
              readOnly
              className="w-12 text-center border border-black bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
