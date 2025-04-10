import { useState } from 'react';

export default function GenerateButton({ onGenerate }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setFeedback('Character is being generated...');
    try {
      await onGenerate();
      setFeedback('Character generated successfully!');
    } catch (error) {
      console.error(error);
      setFeedback('Something went wrong 😬');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
 <button
  onClick={handleClick}
  disabled={loading}
  className={`  className="relative px-8 py-3 border-2 border-yellow-400 text-yellow-200 uppercase font-semibold tracking-wide 
  bg-gradient-to-br from-green-900 to-black 
  hover:from-yellow-700 hover:to-yellow-900
  transition-all duration-300 
  outline-none focus:outline-none rounded-none ${
    loading
      ? 'bg-green-400 cursor-not-allowed'
      : 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-darkgreen-400/50'
  } text-white`}
>
  {loading ? (
    <span className="flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Generating...
    </span>
  ) : (
    'Generate Character'
  )}
</button>

      {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
    </div>
  );
}
