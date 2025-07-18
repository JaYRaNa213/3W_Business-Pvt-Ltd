import RatingUser from "../models/user.model.js";
import ClaimHistory from "../models/claimHistory.model.js";

// In-memory lock to prevent rapid duplicate claims
const claimLock = new Map();

// ✅ Get all users sorted by points (for leaderboard or user list)
export const getUsers = async (req, res) => {
  try {
    const users = await RatingUser.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ✅ Create a new user (check for duplicates)
export const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const newUser = new RatingUser({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "User with this name already exists" });
    }
    console.error("❌ Error creating user:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Claim random points (with lock to prevent spam clicks)
export const claimPoints = async (req, res) => {
  const { id: userId } = req.params;

  // Prevent multiple claims in short time
  if (claimLock.get(userId)) {
    return res.status(429).json({ message: "Please wait before claiming again" });
  }

  // Lock this user
  claimLock.set(userId, true);

  try {
    console.log("🔁 Claim endpoint triggered for", userId);

    const user = await RatingUser.findById(userId);
    if (!user) {
      claimLock.delete(userId);
      return res.status(404).json({ message: "User not found" });
    }

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    await ClaimHistory.create({ userId: user._id, points });

    console.log(`✅ [CLAIMED] ${user.name} claimed ${points} points — Total now: ${user.totalPoints}`);
    res.json({ message: "Points claimed", points });
  } catch (err) {
    console.error("❌ Error claiming points:", err.message);
    res.status(500).json({ message: "Error claiming points" });
  } finally {
    // Unlock after 1 second delay
    setTimeout(() => claimLock.delete(userId), 1000);
  }
};

// ✅ Get full leaderboard
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
    console.error("❌ Error fetching leaderboard:", err.message);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

// ✅ Get claim history for a user
export const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ClaimHistory.find({ userId });
    res.json(history);
  } catch (err) {
    console.error("❌ Error fetching claim history:", err.message);
    res.status(500).json({ message: "Error fetching claim history" });
  }
};
