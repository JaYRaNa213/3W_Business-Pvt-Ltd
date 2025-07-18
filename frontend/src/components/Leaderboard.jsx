import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";
import ClaimButton from "./ClaimButton";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const navigate = useNavigate();

  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);

  return (
    <>
      {/* Claim Button shown only if a user is selected */}
      {currentUserId && (
        <Box display="flex" justifyContent="center" my={2}>
          <ClaimButton userId={currentUserId} onClaim={onClaim} />
        </Box>
      )}

      {/* Top 3 Leaderboard Cards */}
      <TopThreeCards users={topThree} currentUserId={currentUserId} />

      {/* Remaining Leaderboard List */}
      <RemainingList users={remaining} currentUserId={currentUserId} />

      {/* Claim History Button */}
      {currentUserId && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            size="medium"
            variant="outlined"
            onClick={() => navigate(`/history/${currentUserId}`)}
          >
            View Claim History
          </Button>
        </Box>
      )}
    </>
  );
};

export default Leaderboard;
