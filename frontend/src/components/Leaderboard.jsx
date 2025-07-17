import React from "react";
import TopThreeCards from "./TopThreeCards";
import RemainingList from "./RemainingList";

const Leaderboard = ({ data, currentUserId, onClaim }) => {
  const topThree = data.slice(0, 3);
  const remaining = data.slice(3);

  return (
    <>
      <TopThreeCards
        users={topThree}
        currentUserId={currentUserId}
        onClaim={onClaim}
      />
      <RemainingList
        users={remaining}
        currentUserName="Jay Prakash"
        currentUserId={currentUserId}
        onClaim={onClaim}
      />
    </>
  );
};

export default Leaderboard;
