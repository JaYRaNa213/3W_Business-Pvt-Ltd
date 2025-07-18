import { useParams, useNavigate } from "react-router-dom";
import ClaimHistory from "../components/ClaimHistory";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/api";
import { Typography, Box, Button } from "@mui/material";

const ClaimHistoryPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await getAllUsers();
        const user = res.data.find((u) => u._id === userId);
        if (user) setUserName(user.name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUserName();
  }, [userId]);

  return (
    <Box p={3}>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Leaderboard
      </Button>

      <Typography variant="h4" mt={2} mb={3}>
        {userName}'s Claim History
      </Typography>

      <ClaimHistory userId={userId} userName={userName} />
    </Box>
  );
};

export default ClaimHistoryPage;
