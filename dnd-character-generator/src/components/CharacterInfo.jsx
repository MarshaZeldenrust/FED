export function CharacterInfo({ charClass, race, background, alignment }) {
    return (
      <div className="bg-[#e1d3b8] border px-8 py-4 grid grid-cols-2 gap-2 text-sm text-left">
         <strong>Class & Level:</strong>
      <span className="-ml-40">{charClass}</span>
      <strong>Race:</strong>
      <span className="-ml-40">{race}</span>
      <strong>Background:</strong>
      <span className="-ml-40">{background}</span>
      <strong>Alignment:</strong>
      <span className="-ml-40">{alignment}</span>
      <strong>Experience Points:</strong>
      <span className="-ml-40">
        <input
            type="number"
            placeholder="0"
            className="bg-white border px-1 w-full"
        />
      </span >
      <strong>Player Name:</strong>
      <span className="-ml-40">
        <input
          type="text"
          placeholder="Enter your name"
          className="bg-white border px-1 w-full"
        />
      </span>
      </div>
    );
  }
  