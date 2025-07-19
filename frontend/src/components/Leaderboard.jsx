import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";
import ClaimButton from "./ClaimButton";
import { Box, Container, Paper, Typography } from "@mui/material";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints);
  const topThree = [sortedData[1] || {}, sortedData[0] || {}, sortedData[2] || {}];
  const remaining = sortedData.slice(3);

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 } }}>
      {/* Claim + View History Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <ClaimButton userId={currentUserId} onClaim={onClaim} />
      </Box>

      {/* Leaderboard Section */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: { xs: 2, sm: 4 },
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          🏆 Leaderboard
        </Typography>

        {/* Top Three */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={2}
          mb={4}
        >
          <TopThreeCards users={topThree} currentUserId={currentUserId} />
        </Box>

        {/* Remaining List */}
        <Box display="flex" justifyContent="center">
          <Box width="100%" maxWidth={500}>
            <RemainingList users={remaining} currentUserId={currentUserId} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Leaderboard;



// import React from "react";
// import TopThreeCards from "./TopThreeCards";
// import RemainingList from "./RemainingList";
// import ClaimButton from "./ClaimButton";
// import { Box, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Leaderboard = ({ data, currentUserId, onClaim }) => {
//   const navigate = useNavigate();

//   const sortedData = [...data].sort((a, b) => b.totalPoints - a.totalPoints);
//   const topThree = [sortedData[1] || {}, sortedData[0] || {}, sortedData[2] || {}];
//   const remaining = sortedData.slice(3);

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         backgroundColor: "#bdbb28ff", // 🎨 School Bus Yellow
//         borderRadius: 2,
//         p: { xs: 2, sm: 4 },
//         boxShadow: 4,
//       }}
//     >
//       {currentUserId && (
//         <Box display="flex" justifyContent="center" mb={3}>
//           <ClaimButton userId={currentUserId} onClaim={onClaim} />
//         </Box>
//       )}

//       <Box
//         display="flex"
//         flexDirection={{ xs: "column", sm: "row" }}
//         alignItems="center"
//         justifyContent="center"
//         gap={2}
//         mb={4}
//       >
//         <TopThreeCards users={topThree} currentUserId={currentUserId} />
//       </Box>

//       <Box display="flex" justifyContent="center">
//         <Box width="100%" maxWidth={500}>
//           <RemainingList users={remaining} currentUserId={currentUserId} />
//         </Box>
//       </Box>

//       {currentUserId && (
//         <Box display="flex" justifyContent="flex-end" mt={4}>
//           {/* Reserved space for future buttons */}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Leaderboard;
