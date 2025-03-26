// Character Sheet die aangevuld wordt met de componenten
import { useState } from 'react';
import Header from './Header';
import { PortraitBanner } from './PortraitBanner';
import { CharacterInfo } from './CharacterInfo';
import AbilityScores from './AbilityScores';
import { SavingThrows } from './SavingThrows';
import { SkillsETC } from './SkillsETC';
import { PerceptionProficiencies } from './PerceptionProficiencies';
import { Health } from './Health';
import { AttacksSpells } from './AttacksSpells';
import { Equipment } from './Equipment';
import { Description } from './Description';
import { FeaturesTraits } from './FeaturesTraits';
import { generateCharacterData } from '../utils/GenerateCharacterInfo';
import { generateAbilityScores } from '../utils/GenerateAbilityScore';

export default function CharacterSheet() {
  const [character, setCharacter] = useState({});
  const [stats, setStats] = useState([]);

  const generateCharacter = async () => {
    const data = await generateCharacterData();
    setCharacter(data);
    const scores = generateAbilityScores(data); // `data` bevat character info
setStats(scores);
  };
  
  return (
    <div className="w-[210mm] h-[297mm] bg-white mx-auto p-4 border-2 shadow-md text-black flex flex-col gap-2">
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

      {/* Portrait + Info sectie */}
      <div className="flex gap-2 h-[40mm]">
        <div className="w-1/3">
          <PortraitBanner />
        </div>
        <div className="w-2/3">
          <CharacterInfo
            charClass={character.charClass || ''}
            race={character.race || ''}
            background={character.background || ''}
            alignment={character.alignment || ''}
          />
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-grow gap-2 h-full">
        {/* Left column */}
        <div className="w-1/4 flex flex-col gap-2">
        <AbilityScores stats={stats} className="flex-grow" />

          <SavingThrows />
          <SkillsETC className="flex-grow" />
          <PerceptionProficiencies className="flex-grow" />
        </div>

        {/* Middle column */}
        <div className="w-1/2 flex flex-col gap-2">
          <Health />
          <AttacksSpells className="flex-grow" />
          <Equipment className="flex-grow" />
        </div>

        {/* Right column */}
        <div className="w-1/4 flex flex-col gap-2">
          <Description className="flex-grow" />
          <FeaturesTraits className="flex-grow" />
        </div>
      </div>
    </div>
  );
}
