// 🔹 Mapping voor de naamgenerator API
const raceMapping = {
    human: "h",
    dwarf: "d",
    elf: "e",
    "half-elf": "e",
    orc: "o",
    "half-orc": "o"
  };
  
  // 🔹 Fallback namen voor unsupported races
  const fallbackNames = {
    dragonborn: {
      male: ["Arjhan", "Balasar"],
      female: ["Akra", "Vezera"]
    },
    gnome: {
      male: ["Boddynock", "Alston"],
      female: ["Nyx", "Topsy"]
    },
    halfling: {
      male: ["Frodo", "Bilbo"],
      female: ["Daisy", "Rosie"]
    },
    tiefling: {
      male: ["Azazel", "Malphas"],
      female: ["Lilith", "Nyx"]
    }
  };
  
  // 🔧 Naamgenerator logica
  export async function generateFantasyName(race, gender = "male") {
    const mapped = raceMapping[race?.toLowerCase()];
  
    const getFallback = () => {
      const list = fallbackNames[race?.toLowerCase()]?.[gender];
      return list?.[Math.floor(Math.random() * list.length)] || "Unknown Adventurer";
    };
  
    if (!mapped) {
      console.warn(`⚠️ Race "${race}" wordt niet ondersteund door de naamgenerator. Fallback wordt gebruikt.`);
      return getFallback();
    }
  
    try {
      const res = await fetch(`https://fantasyname.lukewh.com/v1/generate?race=${mapped}&gender=${gender}`);
      if (!res.ok) throw new Error("API mislukt");
      const name = await res.text();
      return name.trim();
    } catch (err) {
      console.error("❌ Fout bij ophalen naam:", err);
      return getFallback();
    }
  }
  