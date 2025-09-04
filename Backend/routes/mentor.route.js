import express from "express";
import Mentor from "../models/Mentor.model.js";

const router = express.Router();

// ✅ Seed some mentors
router.post("/seed", async (req, res) => {
  try {
    const mentors = [
      { name: "John Doe", expertise: "React", email: "john@example.com" },
      { name: "Jane Smith", expertise: "Node.js", email: "jane@example.com" },
      { name: "Mark Johnson", expertise: "MongoDB", email: "mark@example.com" },
    ];

    await Mentor.deleteMany(); // clear old data
    const createdMentors = await Mentor.insertMany(mentors);

    res.status(201).json(createdMentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new mentor
router.post("/", async (req, res) => {
  try {
    const { name, expertise, email } = req.body;
    const mentor = new Mentor({ name, expertise, email });
    const savedMentor = await mentor.save();
    res.status(201).json(savedMentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
