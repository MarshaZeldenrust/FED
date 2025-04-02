export function generateAbilityScores(character) {
  const baseArray = [15, 14, 13, 12, 10, 8].sort(() => Math.random() - 0.5);
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

  const scores = {};
  for (let i = 0; i < abilities.length; i++) {
    scores[abilities[i]] = baseArray[i];
  }

  if (character.ability_bonuses) {
    console.log('👀 Racial Bonuses ontvangen:', character.ability_bonuses);

    const map = {
      str: 'strength',
      dex: 'dexterity',
      con: 'constitution',
      int: 'intelligence',
      wis: 'wisdom',
      cha: 'charisma',
    };

    character.ability_bonuses.forEach((bonus) => {
      const index = bonus.ability_score.index.toLowerCase();
      const key = map[index];

      if (key && scores[key] !== undefined) {
        const before = scores[key];
        const after = before + bonus.bonus;

        console.log(`🔁 ${key}: ${before} + ${bonus.bonus} → ${after}`);
        scores[key] = after;
      } else {
        console.warn(`⚠️ Onbekende ability index: ${index}`);
      }
    });
  }

  console.log('👉 Base Ability Scores (random):', baseArray);
  console.log('📋 Final Scores:', scores);

  return scores;
}
