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
  Snackbar,
  Alert,
} from "@mui/material";
import { getAllUsers, createUser } from "../services/api";

const UserSelector = ({
  selectedUserId,
  setSelectedUserId,
  onClaimClick,
  onViewHistoryClick,
}) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      let sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
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
      const res = await createUser(newUserName);
      const userId = res.data._id;
      setSelectedUserId(userId);
      setNewUserName("");
      setOpen(false);
      setSnackbar({
        open: true,
        message: "✅ User added successfully!",
        severity: "success",
      });
      fetchUsers();
    } catch (err) {
      console.error("Error adding user", err);
      setSnackbar({
        open: true,
        message: "❌ Failed to add user",
        severity: "error",
      });
    }
  };

  const handleActionClick = (actionType) => {
    if (!selectedUserId) {
      setSnackbar({
        open: true,
        message: `❗ Please select a user to ${actionType}`,
        severity: "warning",
      });
      return;
    }

    if (actionType === "claim points") onClaimClick();
    if (actionType === "view history") onViewHistoryClick();
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Select User to Claim Points
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
                backgroundColor:
                  selectedUserId === user._id ? "#e3f2fd" : "inherit",
              }}
            >
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          ➕ Add User
        </Button>

        <Box display="flex" gap={2}>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => handleActionClick("view history")}
          >
            📜 View History
          </Button> */}

          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => handleActionClick("claim points")}
          >
            🎯 Claim Points
          </Button> */}
        </Box>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserSelector;
