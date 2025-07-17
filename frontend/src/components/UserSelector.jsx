import { useState } from "react";
import { UserPlus, ChevronDown } from "lucide-react";

export default function UserSelector({ users, selectedUserId, onUserSelect, onAddUser }) {
  const [newUser, setNewUser] = useState("");

  return (
    <div className="p-4 rounded-xl bg-white shadow-md w-full max-w-md space-y-4">
      <label className="block text-lg font-semibold text-gray-700">Select User:</label>
      <select
        className="w-full p-3 border rounded-lg text-gray-800 bg-gray-50 focus:ring focus:ring-blue-300"
        value={selectedUserId}
        onChange={(e) => onUserSelect(e.target.value)}
      >
        <option value="">-- Select a User --</option>
        {(users || []).map((user) => (

          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          className="flex-grow p-3 border rounded-lg text-gray-700 bg-gray-100"
          type="text"
          placeholder="Add new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            if (newUser.trim()) {
              onAddUser(newUser.trim());
              setNewUser("");
            }
          }}
        >
          <UserPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
