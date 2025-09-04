import express from "express";
import Mentor from "../models/Mentor.model.js";

const router = express.Router();

// ✅ Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});

// ✅ Seed mentors with random Indian names
router.post("/seed", async (req, res) => {
  try {
    const sampleMentors = [
      {
        name: "Rohit Sharma",
        title: "Full Stack Developer",
        tasks: 50,
        rating: 4.8,
        reviews: 820,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Priya Mehta",
        title: "Data Scientist",
        tasks: 42,
        rating: 4.9,
        reviews: 610,
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        name: "Arjun Nair",
        title: "Cloud Architect",
        tasks: 37,
        rating: 4.7,
        reviews: 500,
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        name: "Neha Kapoor",
        title: "AI Engineer",
        tasks: 28,
        rating: 4.6,
        reviews: 450,
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        name: "Amit Verma",
        title: "UI/UX Designer",
        tasks: 33,
        rating: 4.8,
        reviews: 720,
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ];

    await Mentor.deleteMany(); // reset
    await Mentor.insertMany(sampleMentors);

    res.json({ message: "Mentors seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed mentors" });
  }
});

export default router;
