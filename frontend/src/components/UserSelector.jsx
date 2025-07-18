import React, { useEffect, useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getAllUsers, createUser } from "../services/api";

const UserSelector = ({ selectedUserId, setSelectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserId, setNewUserId] = useState(null); // 🆕 track new user ID

  const fetchUsers = async () => {
  try {
    const res = await getAllUsers();
    let sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);

    // Move the selected user (new or existing) to the top
    if (selectedUserId) {
      const selectedUser = sorted.find((u) => u._id === selectedUserId);
      sorted = [
        selectedUser,
        ...sorted.filter((u) => u._id !== selectedUserId),
      ];
    }

    setUsers(sorted);
  } catch (err) {
    console.error("Failed to fetch users", err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    try {
      const res = await createUser(newUserName); // returns new user
      const userId = res.data._id;
      setNewUserId(userId); // 🆕 store new user ID to highlight
      setNewUserName("");
      setOpen(false);
      fetchUsers(); // Refresh and auto-select new user
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        Select User
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUserId || ""}
          label="User"
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem
              key={user._id}
              value={user._id}
              style={{
                fontWeight: selectedUserId === user._id ? "bold" : "normal",
                backgroundColor: selectedUserId === user._id ? "#e3f2fd" : "inherit",
              }}
            >
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          ➕ Add User
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            autoFocus
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserSelector;
