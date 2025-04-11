// Character Sheet die aangevuld wordt met de componenten
import { useState } from 'react';

import { PortraitBanner } from './PortraitBanner';
import { CharacterInfo } from './CharacterInfo';
import AbilityScores from './AbilityScores';
import { SavingThrows } from './SavingThrows';
import { SkillsETC } from './SkillsETC';
import { PerceptionProficiencies } from './PerceptionProficiencies';
import Health from './Health';
import { AttacksSpells } from './AttacksSpells';
import  Equipment  from './Equipment';
import Description from './Description';
import { FeaturesTraits } from './FeaturesTraits';
import { generateCharacterData } from '../utils/GenerateCharacterInfo';
import { generateAbilityScores } from '../utils/GenerateAbilityScore';
import { calculateInitiative } from '../utils/DerivedStats';
import GenerateButton from './GenerateButton';

export default function CharacterSheet() {
  const [character, setCharacter] = useState({});
  const [stats, setStats] = useState([]);

  const generateCharacter = async () => {
    const data = await generateCharacterData();
    console.log('charClass from data:', data.charClass);
    const scores = generateAbilityScores(data);
    const initiative = calculateInitiative(scores);
    const classKey = (data.charClass || '').toLowerCase();
  
    // Fetch equipment
    const equipmentRes = await fetch(`https://www.dnd5eapi.co/api/classes/${classKey}/starting-equipment`);
    const equipmentData = await equipmentRes.json();
    const equipment = equipmentData.starting_equipment.map(item => item.equipment.name);

    // Haal extra data op over elk item
const weaponDetails = [];

for (const item of equipmentData.starting_equipment) {
  const index = item.equipment.index;
  const res = await fetch(`https://www.dnd5eapi.co/api/equipment/${index}`);
  const details = await res.json();

  if (details.equipment_category.name === 'Weapon') {
    weaponDetails.push({
      name: details.name,
      damage: details.damage?.damage_dice || '—',
      type: details.damage?.damage_type.name || '—',
      range: details.weapon_range || '—',
    });
  }
}

    // Fetch spells (optioneel voor classes met magic)
    let spells = [];
    try {
      const spellsRes = await fetch(`https://www.dnd5eapi.co/api/classes/${classKey}/spells`);
      const spellsData = await spellsRes.json();
      spells = spellsData.results.slice(0, 5).map(spell => spell.name);
    } catch (e) {
      // Niet elke class heeft spells
      spells = [];
    }

    console.log('class:', classKey);
    console.log('spells from API:', spells);
    console.log('equipment from API:', equipment);
    
    setCharacter({
      ...data,
      initiative,
      equipment,
      spells,
      attacks: weaponDetails,
    });
  
    setStats(scores);
  };
  
  return (
    
    <div className="w-[315mm] h-[445.5mm] bg-white mx-auto p-4 border-2 shadow-md text-black flex flex-col gap-4">

      {/* Header */}
      <div className="text-center border-b-2 pb-2">
        <h1 className="text-2xl font-bold mb-2">D&D Character Generator</h1>
        <GenerateButton onGenerate={generateCharacter} />

      </div>

      {/* Portrait + Character Info */}
      <div className="flex gap-2">
        <div className="w-1/3">
          <PortraitBanner />
        </div>
        <div className="w-2/3">
          <CharacterInfo
            charClass={character.charClass || ''}
            race={character.race || ''}
            background={character.background || ''}
            alignment={character.alignment || ''}
            experiencePoints={character.experiencePoints || ''}
          />
        </div>
      </div>

      <div className="flex gap-2 w-full">
  {/* Left column: 1/3 - split into 2 columns */}
  <div className="w-1/3 flex flex-col gap-2">
  <div className="grid grid-cols-3 gap-2">
    <div className="col-span-1">
      <AbilityScores stats={stats} />
    </div>
    <div className="col-span-2">
      <SkillsETC stats={stats} />
    </div>
  </div>
  <PerceptionProficiencies />
</div>

  {/* Middle column: 1/3 */}
  <div className="w-1/3 flex flex-col gap-2">
    <Health
      armorClass={character.armorClass || 10}
      initiative={character.initiative || 2}
      speed={character.speed || 30}
    />
    <AttacksSpells
  spells={character.spells || []}
  attacks={character.attacks || []}
/>

<Equipment equipment={character.equipment || []} />

  </div>

  {/* Right column: 1/3 */}
  <div className="w-1/3 flex flex-col gap-2">
    <Description />
    <FeaturesTraits />
  </div>
</div>

    </div>
  );
}