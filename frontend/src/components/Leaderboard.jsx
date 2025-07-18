import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";
import ClaimButton from "./ClaimButton";
import { Box } from "@mui/material";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);

  return (
    <>

     {/* Claim Button shown only if a user is selected */}
      {currentUserId && (
        <Box display="flex" justifyContent="center" my={4}>
          <ClaimButton userId={currentUserId} onClaim={onClaim} />
        </Box>
      )}
      {/* Top 3 Leaderboard Cards */}
      <TopThreeCards
        users={topThree}
        currentUserId={currentUserId}
      />

      {/* Remaining Leaderboard List */}
      <RemainingList
        users={remaining}
        currentUserId={currentUserId}
      />

     
    </>
  );
};

export default Leaderboard;

