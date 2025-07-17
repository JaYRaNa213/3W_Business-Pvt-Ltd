// src/components/UserSelector.jsx
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
} from "@mui/material";

const UserSelector = ({ users, selectedUser, setSelectedUser }) => {
  const [newUserName, setNewUserName] = useState("");

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newUserName }),
    });
    setNewUserName("");
    window.location.reload(); // refresh users
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUser}
          label="Select User"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} display="flex" gap={1}>
        <TextField
          fullWidth
          label="Add New User"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default UserSelector;
