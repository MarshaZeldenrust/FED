export function generateAbilityScores(character) {
    // Base scores volgens standaard array
    const baseScores = [15, 14, 13, 12, 10, 8];
  
    // Shuffle array
    const shuffled = [...baseScores].sort(() => Math.random() - 0.5);
  
    // Hier later modifiers toevoegen op basis van character info
    // Bijvoorbeeld: +2 DEX voor elf, etc.
    // if (character.race === 'Elf') { shuffled[1] += 2; }
  
    return shuffled;
  }
  