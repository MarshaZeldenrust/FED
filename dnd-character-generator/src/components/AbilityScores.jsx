export default function AbilityScores({ stats = {} }) {
  const abilities = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ];

  const getModifier = (score) => {
    if (score === undefined) return '-';
    const mod = Math.floor((score - 10) / 2); // Afronding naar beneden
    return mod >= 0 ? `+${mod}` : mod; // Return met '+' voor positieve modifiers
  };

  return (
    <div className="p-2 border border-black bg-[#e1d3b8] flex flex-col gap-2">
      <h3 className="font-bold text-center text-sm">Ability Scores</h3>
      {abilities.map((ability) => {
        const score = stats[ability.toLowerCase()]; // Score ophalen uit stats
        return (
          <div
            key={ability}
            className="w-full aspect-square border border-black rounded bg-white flex flex-col justify-between items-center p-1"
          >
            <span className="text-[11px] font-bold">{ability.toUpperCase()}</span>
            <span className="text-[20px] font-mono">{getModifier(score)}</span> {/* Weergeven modifier */}
            <span className="text-[16px] font-mono">({score ?? '-'})</span> {/* Weergeven score */}
          </div>
        );
      })}
    </div>
  );
}
