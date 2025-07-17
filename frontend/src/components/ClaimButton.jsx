import { useState } from "react";

export default function ClaimButton({ onClaim, disabled }) {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    const awarded = await onClaim(); // returns points
    setPoints(awarded);
    setTimeout(() => setPoints(null), 3000);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <button
        disabled={disabled || loading}
        onClick={handleClick}
        className={`px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Claiming..." : "Claim Points"}
      </button>
      {points && (
        <div className="text-lg text-green-700 font-bold animate-pulse">
          🎉 +{points} Points!
        </div>
      )}
    </div>
  );
}
