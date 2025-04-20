import { useEffect, useState } from "react";
import { generateFantasyName } from "../utils/nameGenerator";

export function PortraitBanner({ race, gender = "male" }) {
  const [name, setName] = useState("Adventurer");
  const [imageSrc, setImageSrc] = useState("/afbeeldingen/default-fantasy.jpg");

  // Laad naam + afbeelding zodra race/class veranderen
  useEffect(() => {
    if (race && gender) {
      generateFantasyName(race, gender).then(setName);
      setImageSrc(selectImage(race, gender));
    }
  }, [race, gender]);

  // Selecteert afbeelding op basis van ras en gender
  const normalize = (str) =>
    str.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

  const selectImage = (race, gender) => {
    const key = `${normalize(race)}_${normalize(gender)}`;
    const fallback = "/afbeeldingen/characters/human_female.jpg";

    const images = {
      human_male: "/afbeeldingen/characters/human_male.jpg",
      human_female: "/afbeeldingen/characters/human_female.jpg",
      elf_male: "/afbeeldingen/characters/elf_male.jpg",
      elf_female: "/afbeeldingen/characters/elf_female.jpg",
      dwarf_male: "/afbeeldingen/characters/dwarf_male.jpg",
      dwarf_female: "/afbeeldingen/characters/dwarf_female.jpg",
      orc_male: "/afbeeldingen/characters/orc_male.jpg",
      orc_female: "/afbeeldingen/characters/orc_female.jpg",
      tiefling_male: "/afbeeldingen/characters/tiefling_male.jpg",
      tiefling_female: "/afbeeldingen/characters/tiefling_female.jpg",
      gnome_female: "/afbeeldingen/characters/gnome_female.jpg",
      gnome_male: "/afbeeldingen/characters/gnome_male.jpg",
     halfling_male: "/afbeeldingen/characters/halfling_male.jpg",
     halfling_female: "/afbeeldingen/characters/halfling_female.jpg",
     dragonborn_male: "/afbeeldingen/characters/dragonborn_male.jpg",
     dragonborn_female: "/afbeeldingen/characters/dragonborn_female.jpg",
     halforc_male: "/afbeeldingen/characters/halforc_male.jpg",
     halforc_female: "/afbeeldingen/characters/halforc_female.jpg",
     halfelf_male: "/afbeeldingen/characters/halfelf_male.jpg",
     halfelf_female: "/afbeeldingen/characters/halfelf_female.jpg",
      
      // Kunnen extra combinaties worden toegevoegd, afbeeldingen zijn nu nog placeholders, 
      // bijbehorende afbeeldingen zoeken kan later als er nog tijd is
    };

    // ✅ Debug logs
    console.log("🎭 Race:", race, "| Gender:", gender);
    console.log("🗝️  Genereerde key:", key);
    console.log("🖼️  Image path:", images[key] || "(fallback gebruikt)");

    return images[key] || fallback;
  };

  return (
    <div className="relative flex flex-col items-center border-1 rounded border-black bg-[#e1d3b8] w-full h-[250px]">
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
        <div className="eagle-lake-regular mt-0.5 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-xl whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
}
