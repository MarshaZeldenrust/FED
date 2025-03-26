export function CharacterInfo({ charClass, race, background, alignment }) {
    return (
      <div className="bg-[#e1d3b8] border p-4 grid grid-cols-2 gap-2 text-sm">
        <div>Class & Level:</div><div>{charClass}</div>
        <div>Race:</div><div>{race}</div>
        <div>Background:</div><div>{background}</div>
        <div>Alignment:</div><div>{alignment}</div>
        <div>Experience Points:</div><div><input type="text" className="border px-1 w-full" /></div>
        <div>Player Name:</div><div><input type="text" className="border px-1 w-full" /></div>
      </div>
    );
  }
  