import { Router } from "express";
import User from "../schema/user.js";
import History from "../schema/history.js";
import { broadcastLeaderboard } from "../websocket.js";

const router = new Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch {
    res.status(500).json({ error: "Failed to get users" });
  }
});

router.post('/addUser', async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = await User.create({ name });
    res.status(200).json({ newUser });
  } catch {
    res.status(500).json({ error: "Failed to add user" });
  }
});

router.post('/claim', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    user.points += points;
    await user.save();

    await History.create({ user: userId, points });
    await broadcastLeaderboard();

    res.status(200).json({ message: "Points updated", user });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json({ history });
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const history = await History.find({ user: req.params.userId });
    res.status(200).json({ history });
  } catch {
    res.status(400).json({ error: "Not Found" });
  }
});

export default router