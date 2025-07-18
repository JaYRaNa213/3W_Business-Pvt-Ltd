// src/components/ClaimButton.jsx
import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { claimPoints } from "../services/api";

const ClaimButton = ({ userId, onClaim }) => {
  const [result, setResult] = useState({ message: "", severity: "success" });
  const [open, setOpen] = useState(false);

  const handleClaim = async () => {
    if (!userId) return;

    try {
      const res = await claimPoints(userId);
      setResult({
        message: `🎉 You claimed ${res.data?.points || "?"} points!`,
        severity: "success",
      });
      if (onClaim) onClaim(userId); // Refresh leaderboard and history
    } catch (error) {
      console.error("Error claiming points:", error);
      setResult({
        message: error?.response?.data?.message || "Failed to claim points",
        severity: "error",
      });
    } finally {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleClaim}
        disabled={!userId}
        sx={{ height: "56px" }}
      >
        🎯 Claim Points
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={result.severity}
          sx={{ width: "100%" }}
        >
          {result.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClaimButton;
