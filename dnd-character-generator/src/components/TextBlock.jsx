import { useId } from "react";

export default function TextBlock({ label }) {
  const id = useId();
  return (
    <div className="border-2 border-black rounded p-2 bg-gray-50 shadow-inner">
      <label
        className="block text-center uppercase text-xs font-semibold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        placeholder="Type here..."
        className="w-full resize-none p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
      ></textarea>
    </div>
  );
}