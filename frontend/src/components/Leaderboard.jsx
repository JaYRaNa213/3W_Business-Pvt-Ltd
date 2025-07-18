import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";
import ClaimButton from "./ClaimButton";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const navigate = useNavigate();

  const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints);

  const topThree = [sortedData[1], sortedData[0], sortedData[2]]; 

  const remaining = sortedData.slice(3);

  

  return (
    <>
    
      {currentUserId && (
        <Box display="flex" justifyContent="center" my={2} mb={8}>
  <ClaimButton userId={currentUserId} onClaim={onClaim} />
</Box>

      )}

      
      <TopThreeCards users={topThree} currentUserId={currentUserId} />

      
      <RemainingList users={remaining} currentUserId={currentUserId} />

      
      {currentUserId && (
        <Box display="flex" justifyContent="center" mt={8} mb={6}>
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
