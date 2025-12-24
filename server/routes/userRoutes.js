import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

/* READ + SEARCH */
router.get("/", async (req, res) => {
  const { search } = req.query;

  const users = await User.find({
    name: { $regex: search || "", $options: "i" }
  });

  res.json(users);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(user);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
