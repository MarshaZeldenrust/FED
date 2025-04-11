export default function Equipment({ equipment = [] }) {
  return (
    <div className="p-2 border border-black bg-[#e1d3b8] font-bold text-sm">
      <h2 className="text-center mb-2">Equipment</h2>
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
