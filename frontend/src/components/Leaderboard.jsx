import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";
import ClaimButton from "./ClaimButton";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const navigate = useNavigate();

  const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints);

  
  // const topThree = sortedData.slice(0, 3);


  const topThree = [sortedData[1], sortedData[0], sortedData[2]]; 

 
  const remaining = sortedData.slice(3);

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 }, mt: 2 }}>
      
      {currentUserId && (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ my: { xs: 2, sm: 8 } }}
        >
          <ClaimButton userId={currentUserId} onClaim={onClaim} />
        </Box>
      )}

      <TopThreeCards users={topThree} currentUserId={currentUserId} />

      <RemainingList users={remaining} currentUserId={currentUserId} />

      {currentUserId && (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ mt: { xs: 4, sm: 6 }, mb: { xs: 4, sm: 8 } }}
        >
          <Button
            size="medium"
            variant="outlined"
            onClick={() => navigate(`/history/${currentUserId}`)}
          >
            View Claim History
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Leaderboard;
