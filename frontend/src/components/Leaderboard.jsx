const getRankStyle = (rank) => {
  if (rank === 1) return "text-yellow-500 font-bold";
  if (rank === 2) return "text-gray-500 font-semibold";
  if (rank === 3) return "text-orange-500 font-semibold";
  return "text-gray-700";
};

export default function Leaderboard({ users }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">🏆 Leaderboard</h2>
      <ul className="space-y-2">
        {users?.map((user) => (
          <li
            key={user._id}
            className="flex justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <span className={`text-lg ${getRankStyle(idx + 1)}`}>
              #{idx + 1} {user.name}
            </span>
            <span className="text-lg text-blue-600 font-bold">{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
