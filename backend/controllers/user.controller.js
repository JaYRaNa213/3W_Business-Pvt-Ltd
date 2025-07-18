import RatingUser from "../models/user.model.js";
import ClaimHistory from "../models/claimHistory.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await RatingUser.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const newUser = new RatingUser({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ message: "User with this name already exists" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};


export const claimPoints = async (req, res) => {
  try {
    const { id: userId } = req.params; // ✅ fix param name
    const user = await RatingUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    await ClaimHistory.create({ userId: user._id, points });

    res.json({ message: "Points claimed", points });
  } catch (err) {
    res.status(500).json({ message: "Error claiming points" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await RatingUser.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      name: u.name,
      totalPoints: u.totalPoints,
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

export const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;
const history = await ClaimHistory.find({ userId });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching claim history" });
  }
};
