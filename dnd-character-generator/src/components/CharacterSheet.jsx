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

export default function CharacterSheet() {
  const [character, setCharacter] = useState({});
  const [stats, setStats] = useState([]);

  const generateCharacter = async () => {
    const data = await generateCharacterData();
    setCharacter(data);
    const scores = generateAbilityScores(data);
    setStats(scores);
  };

  return (
    <div className="w-full max-w-[1100px] min-h-screen bg-white mx-auto p-4 border-2 shadow-md text-black flex flex-col gap-4">
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

      {/* Main layout */}
      <div className="flex gap-2 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-2 w-1/4">
          <AbilityScores stats={stats} />
          <SavingThrows />
          <SkillsETC />
          <PerceptionProficiencies />
        </div>

        {/* Middle column */}
        <div className="flex flex-col gap-2 w-1/2">
          <Health
            armorClass={character.armorClass || 10}
            initiative={character.initiative || 2}
            speed={character.speed || 30}
          />
          <AttacksSpells />
          <Equipment />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2 w-1/4">
          <Description />
          <FeaturesTraits />
        </div>
      </div>
    </div>
  );
}