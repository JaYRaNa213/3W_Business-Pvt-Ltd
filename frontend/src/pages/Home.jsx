import React, { useEffect, useState } from "react";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";
import UserSelector from "../components/UserSelector";
import ClaimHistory from "../components/ClaimHistory";
import { getLeaderboard, getUserHistory } from "../services/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await getLeaderboard();
    setUsers(res.data);
  };

  const fetchHistory = async (id) => {
    if (!id) return;
    const res = await getUserHistory(id);
    setHistory(res.data);
  };

  const handleUserSelect = (id) => {
    setSelectedUserId(id);
    fetchHistory(id);
  };

  const handleClaimRefresh = async () => {
    await fetchLeaderboard();
    await fetchHistory(selectedUserId);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <UserSelector
        users={users}
        selectedUserId={selectedUserId}
        onSelect={handleUserSelect}
        onUserAdded={fetchLeaderboard}
      />

      <div style={{ margin: "20px 0" }}>
        <ClaimButton userId={selectedUserId} onClaim={handleClaimRefresh} />
      </div>

      <Leaderboard
        data={users}
        currentUserId={selectedUserId}
        onClaim={handleClaimRefresh}
      />

      <ClaimHistory history={history} />
    </div>
  );
};

export default Home;
