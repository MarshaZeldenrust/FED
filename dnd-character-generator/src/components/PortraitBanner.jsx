import { useEffect, useState } from "react";
import { generateFantasyName } from "../utils/nameGenerator";

export function PortraitBanner({ race, charClass, gender = "male" }) {
  const [name, setName] = useState("Adventurer");
  const [imageSrc, setImageSrc] = useState("/afbeeldingen/default-fantasy.jpg");

  // Laad naam + afbeelding zodra race/class veranderen
  useEffect(() => {
    if (race && charClass) {
      generateFantasyName(race, gender).then(setName);
      setImageSrc(selectImage(race, charClass, gender));
    }
  }, [race, charClass, gender]);

  // Selecteer afbeelding op basis van ras, class en gender
  const selectImage = (race, charClass, gender) => {
    const key = `${race.toLowerCase()}_${charClass.toLowerCase()}_${gender.toLowerCase()}`;
    const fallback = "/afbeeldingen/default-fantasy.jpg";

    const images = {
      human_barbarian_male: "/afbeeldingen/characters/human_barbarian_male.jpg",
      human_barbarian_female: "/afbeeldingen/characters/human_barbarian_female.jpg",
      elf_wizard_male: "/afbeeldingen/characters/elf_wizard_male.jpg",
      elf_wizard_female: "/afbeeldingen/characters/elf_wizard_female.jpg",
      dwarf_fighter_male: "/afbeeldingen/characters/dwarf_fighter_male.jpg",
      tiefling_warlock_female: "/afbeeldingen/characters/tiefling_warlock_female.jpg",
      barbarian_male: "/afbeeldingen/characters/barbarian_male.jpg",
      barbarian_female: "/afbeeldingen/characters/barbarian_female.jpg",
      rogue_male: "/afbeeldingen/characters/rogue_male.jpg",
      rogue_female: "/afbeeldingen/characters/rogue_female.jpg",
      wizard_male: "/afbeeldingen/characters/wizard_male.jpg",
      wizard_female: "/afbeeldingen/characters/wizard_female.jpg",
      orc_barbarian_female: "/afbeeldingen/characters/orc_barbarian_female.jpg",
      human_warrior_male: "/afbeeldingen/characters/human_warrior_male.jpg",
      human_warrior_female: "/afbeeldingen/characters/human_warrior_female.jpg",
      tiefling_rogue_male: "/afbeeldingen/characters/tiefling_rogue_male.jpg",
      tiefling_rogue_female: "/afbeeldingen/characters/tiefling_rogue_female.jpg"
      // Kunnen extra combinaties worden toegevoegd, afbeeldingen zijn nu nog placeholders, 
      // bijbehorende afbeeldingen zoeken kan later als er nog tijd is 
    };

    return images[key] || fallback;
  };

  return (
    <div className="relative flex flex-col items-center border-2 border-black bg-[#e1d3b8] w-full h-[250px]">
      {/* Afbeelding */}
      <img
        src={imageSrc}
        alt="Character"
        className="w-[170px] h-[250px] mt-2 object-cover border border-black"
      />
  
      {/* Naam-banner over de afbeelding */}
      <div className="absolute top-[190px] w-[300px] h-[119px] z-10">
        <img
          src="/afbeeldingen/dndbanner.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-sm whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
}
