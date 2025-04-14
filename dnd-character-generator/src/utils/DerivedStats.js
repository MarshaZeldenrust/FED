// Berekent initiative (op basis van alleen dexterityScore)
export function calculateInitiative(dex) {
  const dexMod = Math.floor((dex - 10) / 2);
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + dexMod;

  console.log('🧠 INITIATIVE BEREKENING');
  console.log(` - DEX score: ${dex}`);
  console.log(` - DEX modifier: ${dexMod}`);
  console.log(` - d20 roll: ${roll}`);
  console.log(`✅ Initiative = ${roll} + ${dexMod} = ${total}`);
  console.log('---------------------------');

  return total;
}

// Berekent armor class (10 + dex modifier)
export function calculateArmorClass(dex) {
  const dexMod = Math.floor((dex - 10) / 2);
  return 10 + dexMod;
}

// Losse modifier-functie
export function calculateDexModifier(dex) {
  return Math.floor((dex - 10) / 2);
}
