import RatingUser from "../models/user.model.js";
import ClaimHistory from "../models/claimHistory.model.js";

export const getUsers = async (req, res) => {
  const users = await RatingUser.find().sort({ totalPoints: -1 });
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name } = req.body;
  const newUser = new RatingUser({ name });
  await newUser.save();
  res.status(201).json(newUser);
};

export const claimPoints = async (req, res) => {
  const userId = req.params.id;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await RatingUser.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalPoints += randomPoints;
  await user.save();

  const history = new ClaimHistory({
    userId,
    points: randomPoints,
    claimedAt: new Date(),
  });
  await history.save();

  res.status(200).json({ user, randomPoints });
};

export const getLeaderboard = async (req, res) => {
  const users = await RatingUser.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((u, i) => ({
    rank: i + 1,
    name: u.name,
    totalPoints: u.totalPoints,
  }));
  res.json(leaderboard);
};

export const getClaimHistory = async (req, res) => {
  const history = await ClaimHistory.find()
    .populate("userId", "name")
    .sort({ claimedAt: -1 });
  res.json(history);
};
