import React from "react";

const Leaderboard = ({ users, onViewHistory }) => {
  const getStyle = (rank) => {
    switch (rank) {
      case 0:
        return "bg-yellow-200 border-yellow-400";
      case 1:
        return "bg-gray-300 border-gray-400";
      case 2:
        return "bg-amber-200 border-amber-400";
      default:
        return "bg-white border-gray-200";
    }
  };

  const top3 = [...users].sort((a, b) => b.points - a.points).slice(0, 3);
  const rest = [...users].sort((a, b) => b.points - a.points).slice(3);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🏆 Leaderboard</h2>
        <button
          onClick={onViewHistory}
          className="text-blue-600 hover:underline font-medium"
        >
          View Claim History
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {top3.map((user, i) => (
          <div
            key={user.id}
            className={`w-60 rounded-xl border px-5 py-4 shadow-md text-center ${getStyle(i)}`}
          >
            <div className="text-2xl font-bold text-gray-800">#{i + 1}</div>
            <div className="text-lg font-medium">{user.name}</div>
            <div className="text-xl font-semibold text-gray-700 mt-1">
              {user.points} pts
            </div>
          </div>
        ))}
      </div>

      {/* Remaining users stacked vertically */}
      <div className="flex flex-col gap-3 mt-6">
        {rest.map((user, i) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-gray-700 w-6">
                {i + 4}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {user.name}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-700">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
