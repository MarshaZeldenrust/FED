//Genereert de Character Info
import { calculateArmorClass, calculateInitiative } from '../utils/DerivedStats';

export async function generateCharacterData() {
  const [raceRes, classRes, backgroundsRes] = await Promise.all([
    fetch('https://www.dnd5eapi.co/api/races'),
    fetch('https://www.dnd5eapi.co/api/classes'),
    fetch('https://www.dnd5eapi.co/api/backgrounds')
  ]);

  const [races, classes, backgrounds] = await Promise.all([
    raceRes.json(),
    classRes.json(),
    backgroundsRes.json()
  ]);

  // De API heeft voor backgrounds alleen Acolyte staan, dus die vul ik aan

  const apiBackgrounds = backgrounds.results.map(b => b.name);

  // new Set zorgt ervoor dat er geen duplicates voorkomen voor het geval de API ooit aangevuld wordt
  const combinedBackgrounds = [...new Set([
    ...apiBackgrounds,
    "Folk Hero",
    "Sage",
    "Soldier",
    "Criminal",
    "Entertainer",
    "Noble",
    "Outlander",
    "Hermit",
    "Guild Artisan"
  ])];

  const randomRace = races.results[Math.floor(Math.random() * races.results.length)].index;
  const randomClass = classes.results[Math.floor(Math.random() * classes.results.length)].index;
  const randomBackground = combinedBackgrounds[Math.floor(Math.random() * combinedBackgrounds.length)];
  const randomAlignment = [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"
  ][Math.floor(Math.random() * 9)];

  const raceData = await fetch(`https://www.dnd5eapi.co/api/races/${randomRace}`).then(res => res.json());
  const classData = await fetch(`https://www.dnd5eapi.co/api/classes/${randomClass}`).then(res => res.json());

  const dexterityScore = Math.floor(Math.random() * 8) + 10;
  const armorClass = calculateArmorClass(dexterityScore);
  const initiative = calculateInitiative(dexterityScore);
  
  const gender = Math.random() < 0.5 ? "male" : "female";

// Race traits ophalen
const raceTraits = raceData.traits?.map(t => t.name) || [];

// Class features ophalen (alleen level 1)
const classFeaturesRes = await fetch(`https://www.dnd5eapi.co${classData.class_levels}`);
const classFeaturesData = await classFeaturesRes.json();
const level1Features = classFeaturesData
  .find(level => level.level === 1)
  ?.features?.map(f => f.name) || [];

  return {
    race: raceData.name,
    charClass: classData.name,
    background: randomBackground,
    alignment: randomAlignment,
    speed: raceData.speed,
    dexterity: dexterityScore,
    ability_bonuses: raceData.ability_bonuses,
    languages: raceData.languages.map(lang => lang.name),
    raceTraits: raceTraits,
classTraits: level1Features,
armorClass: armorClass,
initiative: initiative,
  };
}
