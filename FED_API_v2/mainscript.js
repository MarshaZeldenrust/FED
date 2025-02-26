document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate-btn").addEventListener("click", generateCharacter);
});

// 🔹 Map D&D 5e rassen naar ondersteunde rassen in de naamgenerator API
const raceMapping = {
    "human": "h",
    "dwarf": "d",
    "elf": "e",
    "half-elf": "e",
    "orc": "o",
    "half-orc": "o"
};

// 🔹 Fallback namen voor niet-ondersteunde rassen
const fallbackNames = {
    dragonborn: {
        male: ["Arjhan", "Balasar", "Theron", "Vorjhan", "Zareth", "Korrin"],
        female: ["Akra", "Vezera", "Medrash", "Sora", "Zofari", "Tazara"],
    },
    gnome: {
        male: ["Boddynock", "Alston", "Gimble", "Fizzlebang", "Tinkerton", "Merric"],
        female: ["Nyx", "Topsy", "Flick", "Jinzelle", "Tawny", "Mim"],
    },
    halfling: {
        male: ["Frodo", "Bilbo", "Samwise", "Meriadoc", "Peregrin", "Tobin"],
        female: ["Daisy", "Rosie", "Marigold", "Willow", "Eldra", "Mira"],
    },
    tiefling: {
        male: ["Azazel", "Malphas", "Zariel", "Xaphan", "Zepar", "Belial"],
        female: ["Lilith", "Nyx", "Zephora", "Vashna", "Vespera", "Nemeia"],
    }
};

// 🛠 Haalt een fallback-naam op als de naamgenerator API het ras niet ondersteunt
function getFallbackName(race, gender) {
    const raceKey = race.toLowerCase();
    const genderKey = gender.toLowerCase();

    if (fallbackNames[raceKey] && fallbackNames[raceKey][genderKey]) {
        return fallbackNames[raceKey][genderKey][Math.floor(Math.random() * fallbackNames[raceKey][genderKey].length)];
    }

    return "Unknown Adventurer"; // Standaard naam als er geen andere optie is
}

// 🛠 Haalt een naam op van de naamgenerator API, of gebruikt een fallback als de API het ras niet ondersteunt
async function fetchRandomName(race, gender) {
    try {
        const mappedRace = raceMapping[race.toLowerCase()];
        if (!mappedRace) {
            console.warn(`⚠️ Race "${race}" wordt niet ondersteund door de naamgenerator. Fallback wordt gebruikt.`);
            return getFallbackName(race, gender);
        }

        console.log(`🔍 Oproepen van naamgenerator voor: ${race} (${mappedRace}), gender: ${gender}`);
        const response = await fetch(`https://fantasyname.lukewh.com/v1/generate?race=${mappedRace}&gender=${gender}`);

        if (!response.ok) {
            console.error("❌ Naamgenerator API gaf een fout:", response.status);
            return getFallbackName(race, gender);
        }

        const name = await response.text();
        console.log("🎭 Ontvangen naam:", name);
        return name.trim();
    } catch (error) {
        console.error("❌ Fout bij ophalen naam:", error);
        return getFallbackName(race, gender);
    }
}

// 🛠 Genereert een willekeurig D&D 5e personage en vult de HTML in
async function generateCharacter() {
    try {
        console.log("🔄 Loading indicator tonen...");
        document.getElementById("loading").classList.remove("loading-hidden");
        document.getElementById("loading").classList.add("loading-visible");

        console.log("⏳ Generating character...");

        // Simuleer vertraging (verwijder dit als API-calls traag genoeg zijn)
        await new Promise(resolve => setTimeout(resolve, 500));

        // API Calls (eerst ophalen!)
        const raceRes = await fetch('https://www.dnd5eapi.co/api/races');
        const classRes = await fetch('https://www.dnd5eapi.co/api/classes');
        const backgroundsRes = await fetch('https://www.dnd5eapi.co/api/backgrounds');

        // Wacht op JSON-data voordat we verdergaan
        const races = await raceRes.json();
        const classes = await classRes.json();
        const backgrounds = await backgroundsRes.json();

        // 🛠 Extra backgrounds toevoegen als de API beperkt is
        const extraBackgrounds = [
            "Noble", "Criminal", "Folk Hero", "Sage", "Entertainer", 
            "Soldier", "Charlatan", "Guild Artisan", "Hermit", "Outlander", "Urchin"
        ];

        // Controleer of de API data bevat en vul aan indien nodig
        let availableBackgrounds = backgrounds.results.map(bg => bg.name) || [];
        if (availableBackgrounds.length <= 1) {
            console.warn("⚠️ API bevat weinig backgrounds, extra opties toegevoegd.");
            availableBackgrounds = availableBackgrounds.concat(extraBackgrounds);
        }

        // Willekeurig geslacht kiezen
        const gender = Math.random() < 0.5 ? "male" : "female";
        const randomRace = races.results[Math.floor(Math.random() * races.results.length)].index;
        const randomClass = classes.results[Math.floor(Math.random() * classes.results.length)].index;
        const randomBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
        const randomAlignment = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"][Math.floor(Math.random() * 9)];

        console.log("🎭 Gekozen Background:", randomBackground);

        // Haal ras- en klassengegevens op
        const raceData = await fetch(`https://www.dnd5eapi.co/api/races/${randomRace}`).then(res => res.json());
        const classData = await fetch(`https://www.dnd5eapi.co/api/classes/${randomClass}`).then(res => res.json());

        // Haal een naam op
        const randomName = await fetchRandomName(raceData.name.toLowerCase(), gender);

        // Stats genereren
        let stats = [15, 14, 13, 12, 10, 8];
        stats.sort(() => Math.random() - 0.5);

        raceData.ability_bonuses.forEach(bonus => {
            const statIndex = ["str", "dex", "con", "int", "wis", "cha"].indexOf(bonus.ability_score.index);
            if (statIndex !== -1) {
                stats[statIndex] += bonus.bonus;
            }
        });

        let conMod = Math.floor((stats[2] - 10) / 2);
        let dexMod = Math.floor((stats[1] - 10) / 2);
        let hitDie = parseInt(classData.hit_die);
        let maxHP = hitDie + conMod;
        let armorClass = 10 + dexMod;
        let speed = raceData.speed + " ft.";

        // HTML invullen
        document.getElementById("char-name").innerText = randomName;
        document.getElementById("char-gender").innerText = gender.charAt(0).toUpperCase() + gender.slice(1);
        document.getElementById("char-class").innerText = classData.name;
        document.getElementById("char-race").innerText = raceData.name;
        document.getElementById("char-background").innerText = randomBackground;
        document.getElementById("char-alignment").innerText = randomAlignment;

        ["str", "dex", "con", "int", "wis", "cha"].forEach((stat, i) => {
            document.getElementById(stat).innerText = stats[i];
        });

        document.getElementById("hp").innerText = maxHP;
        document.getElementById("ac").innerText = armorClass;
        document.getElementById("speed").innerText = speed;
        document.getElementById("initiative").innerText = `+${Math.max(0, dexMod)}`;

        console.log("✅ Character succesvol gegenereerd!");
    } catch (error) {
        console.error("❌ Fout bij genereren karakter:", error);
    } finally {
        console.log("✅ Loading indicator verbergen...");
        document.getElementById("loading").classList.remove("loading-visible");
        document.getElementById("loading").classList.add("loading-hidden");
    }
}
