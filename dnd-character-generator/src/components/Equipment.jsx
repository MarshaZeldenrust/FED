export default function Equipment({ equipment = [] }) {
  return (
    <div className="h-70 p-2 border rounded border-black bg-[#e1d3b8] text-sm">
      <h2 className="eagle-lake-regular text-xl mb-4">Equipment</h2>
      <ul className="list-disc pl-5 text-left">
        {equipment.length > 0 ? (
          equipment.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li className="italic text-gray-600">No equipment</li>
        )}
      </ul>
    </div>
  );
}
