import express from "express";
import {
  getUsers,
  createUser,
  claimPoints,
  getLeaderboard,
  getClaimHistory,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/:id/claim", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history/:userId", getClaimHistory);

export default router;
