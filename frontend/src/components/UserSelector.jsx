import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { getUsers, claimPoints } from "../services/api";

const UserSelector = ({ onUserChange, refreshLeaderboard }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, points: 0 });

  // Load users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
        if (res.data.length > 0) {
          setSelectedUserId(res.data[0]._id);
          onUserChange(res.data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle user dropdown change
  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
    onUserChange(e.target.value);
  };

  // Handle claim button
  const handleClaim = async () => {
    try {
      const res = await claimPoints(selectedUserId);
      const points = res?.data?.points || 0;
      setSnackbar({ open: true, points });
      refreshLeaderboard(); // refresh rankings
    } catch (err) {
      console.error("Error claiming points:", err);
    }
  };

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Select User</InputLabel>
        <Select value={selectedUserId} onChange={handleUserChange} label="Select User">
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClaim}
        disabled={!selectedUserId}
      >
        Claim Points
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          variant="filled"
        >
          🎉 You earned {snackbar.points} points!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserSelector;
