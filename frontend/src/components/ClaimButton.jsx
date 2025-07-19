import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClaimButton = ({ userId, onClaim }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleClaim = async () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: "⚠️ Please select a user to claim points.",
        severity: "warning",
      });
      return;
    }

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
    if (!userId) {
      setSnackbar({
        open: true,
        message: "⚠️ Please select a user to view history.",
        severity: "warning",
      });
      return;
    }

    navigate(`/history/${userId}`);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleViewHistory}
            sx={{
              opacity: userId ? 1 : 0.5,
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            📜 View History
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleClaim}
            sx={{
              opacity: userId ? 1 : 0.5,
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "🎯 Claim Points"
            )}
          </Button>
        </Stack>
      </Box>

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
