// src/components/ClaimButton.jsx
import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { claimPoints } from "../services/api";

const ClaimButton = ({ userId, onClaim }) => {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClaim = async () => {
    if (!userId) return;
    const res = await claimPoints(userId);
    setResult(res);
    setOpen(true);
    onClaim(); // trigger parent refresh
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
          severity="success"
          sx={{ width: "100%" }}
        >
          {result?.message || "Points claimed!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClaimButton;
