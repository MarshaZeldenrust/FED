export function calculateInitiative(scores) {
    const dex = scores.dexterity;
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
  