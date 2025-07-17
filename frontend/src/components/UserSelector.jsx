// === src/components/UserSelector.jsx ===
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import '../styles/UserSelector.css';

const UserSelector = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(data => setUsers(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="user-selector">
      <label htmlFor="user-select">Select User:</label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select --</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
