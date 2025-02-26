document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate-btn").addEventListener("click", generateCharacter);
});

async function generateCharacter() {
    try {
        console.log("🔄 Loading indicator tonen...");
        const loadingElement = document.getElementById("loading");
        loadingElement.classList.remove("loading-hidden");
        loadingElement.classList.add("loading-visible");

        const [raceRes, classRes, backgroundsRes] = await Promise.all([
            fetch('https://www.dnd5eapi.co/api/races'),
            fetch('https://www.dnd5eapi.co/api/classes'),
            fetch('https://www.dnd5eapi.co/api/backgrounds')
        ]);

        if (!raceRes.ok || !classRes.ok || !backgroundsRes.ok) {
            throw new Error("API response error");
        }

        const [races, classes, backgrounds] = await Promise.all([
            raceRes.json(),
            classRes.json(),
            backgroundsRes.json()
        ]);

        const gender = Math.random() < 0.5 ? "male" : "female";
        const randomRace = races.results[Math.floor(Math.random() * races.results.length)].index;
        const randomClass = classes.results[Math.floor(Math.random() * classes.results.length)].index;
        const randomBackground = backgrounds.results.length
            ? backgrounds.results[Math.floor(Math.random() * backgrounds.results.length)].name
            : "Folk Hero";
        const randomAlignment = ["Lawful Good", "Neutral Good", "Chaotic Good",
                                  "Lawful Neutral", "True Neutral", "Chaotic Neutral",
                                  "Lawful Evil", "Neutral Evil", "Chaotic Evil"][Math.floor(Math.random() * 9)];

        const raceData = await fetch(`https://www.dnd5eapi.co/api/races/${randomRace}`).then(res => res.json());
        const classData = await fetch(`https://www.dnd5eapi.co/api/classes/${randomClass}`).then(res => res.json());

        // Simulatie van vertraging (indien nodig)
        await new Promise(resolve => setTimeout(resolve, 500));

        const randomName = gender === "male" ? "John the Brave" : "Jane the Fearless";

        let stats = [15, 14, 13, 12, 10, 8].sort(() => Math.random() - 0.5);
        let conMod = Math.floor((stats[2] - 10) / 2);
        let dexMod = Math.floor((stats[1] - 10) / 2);
        let hitDie = parseInt(classData.hit_die);
        let maxHP = hitDie + conMod;
        let armorClass = 10 + dexMod;
        let speed = raceData.speed + " ft.";

        document.getElementById("char-name-banner").innerText = randomName;
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
        const loadingElement = document.getElementById("loading");
        loadingElement.classList.remove("loading-visible");
        loadingElement.classList.add("loading-hidden");
    }
}
