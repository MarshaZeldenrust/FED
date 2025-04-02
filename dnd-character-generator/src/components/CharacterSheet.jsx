// Character Sheet die aangevuld wordt met de componenten
import { useState } from 'react';
import Header from './Header';
import { PortraitBanner } from './PortraitBanner';
import { CharacterInfo } from './CharacterInfo';
import AbilityScores from './AbilityScores';
import { SavingThrows } from './SavingThrows';
import { SkillsETC } from './SkillsETC';
import { PerceptionProficiencies } from './PerceptionProficiencies';
import Health from './Health';
import { AttacksSpells } from './AttacksSpells';
import { Equipment } from './Equipment';
import { Description } from './Description';
import { FeaturesTraits } from './FeaturesTraits';
import { generateCharacterData } from '../utils/GenerateCharacterInfo';
import { generateAbilityScores } from '../utils/GenerateAbilityScore';
import { calculateInitiative } from '../utils/DerivedStats';

export default function CharacterSheet() {
  const [character, setCharacter] = useState({});
  const [stats, setStats] = useState([]);

  const generateCharacter = async () => {
    const data = await generateCharacterData();
  
    const scores = generateAbilityScores(data);        
    const initiative = calculateInitiative(scores);   
  
    setCharacter({
      ...data,
      initiative,                                       
    });
  
    setStats(scores);                                   
  };
  
  return (
    
    <div className="w-[315mm] h-[445.5mm] bg-white mx-auto p-4 border-2 shadow-md text-black flex flex-col gap-4">

      {/* Header */}
      <div className="text-center border-b-2 pb-2">
        <h1 className="text-2xl font-bold mb-2">D&D Character Generator</h1>
        <button
          onClick={generateCharacter}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Generate Character
        </button>
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
    <AttacksSpells />
    <Equipment />
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