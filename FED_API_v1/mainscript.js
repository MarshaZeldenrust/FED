document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("generate-btn");
    const display = document.getElementById("character-display");

    async function generateCharacter() {
        try {
            const raceRes = await fetch('https://www.dnd5eapi.co/api/races');
            const classRes = await fetch('https://www.dnd5eapi.co/api/classes');

            const races = await raceRes.json();
            const classes = await classRes.json();

            const randomRace = races.results[Math.floor(Math.random() * races.results.length)].name;
            const randomClass = classes.results[Math.floor(Math.random() * classes.results.length)].name;

            display.innerHTML = `Je hebt een <strong>${randomRace} ${randomClass}</strong> gemaakt! 🎲`;
        } catch (error) {
            display.innerHTML = "Fout bij het ophalen van gegevens. Probeer opnieuw.";
            console.error("API Error:", error);
        }
    }

    button.addEventListener("click", generateCharacter);
});
