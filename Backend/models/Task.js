import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  tasks: Number,
  rating: Number,
  reviews: Number,
  avatar: String,
});

export default mongoose.model("Mentor", mentorSchema);
