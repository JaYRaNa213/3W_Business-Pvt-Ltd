import React, { useState } from 'react';
import { createUser } from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleAddUser = async () => {
    if (!name.trim()) return;

    try {
      const res = await createUser(name.trim());
      setSnack({ open: true, message: 'User added successfully!', severity: 'success' });
      setName('');
      onUserAdded(); // Refresh leaderboard
    } catch (err) {
      setSnack({ open: true, message: 'Error adding user.', severity: 'error' });
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" mb={2}>Add New User</Typography>
      <Box display="flex" gap={2}>
        <TextField
          label="Enter name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddUserForm;
