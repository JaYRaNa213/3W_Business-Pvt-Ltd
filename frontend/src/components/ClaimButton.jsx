import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClaimButton = ({ userId, onClaim }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleClaim = async () => {
    try {
      setLoading(true);
      const claimedPoints = await onClaim();
      setSnackbar({
        open: true,
        message: `✅ Claimed ${claimedPoints} points successfully!`,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "❌ Failed to claim points!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate(`/history/${userId}`);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!userId}
          onClick={handleViewHistory}
        >
          📜 View History
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={loading || !userId}
          onClick={handleClaim}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "🎯 Claim Points"
          )}
        </Button>
      </Stack>

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
    </>
  );
};

export default ClaimButton;
