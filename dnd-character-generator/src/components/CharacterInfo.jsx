export function CharacterInfo({ charClass, race, background, alignment }) {
    return (
      <div className="bg-[#e1d3b8] border p-4 grid grid-cols-2 gap-2 text-sm">
        <div className="font-bold">Class & Level:</div><div>{charClass}</div>
        <div className="font-bold">Race:</div><div>{race}</div>
        <div className="font-bold">Background:</div><div>{background}</div>
        <div className="font-bold">Alignment:</div><div>{alignment}</div>
        <div className="font-bold">Experience Points:</div><div><input type="text" placeholder="Enter Experience points" className="bg-white border px-1 w-full" /></div>
        <div className="font-bold">Player Name:</div><div><input type="text" placeholder="Enter your name" className="bg-white border px-1 w-full" /></div>
      </div>
    );
  }
  