import TopThreeCards from './TopThreeCards';
import RemainingList from './RemainingList';

const Leaderboard = ({ data }) => {
  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <>
      <TopThreeCards users={topThree} />
      <RemainingList users={rest} />
    </>
  );
};

export default Leaderboard;
