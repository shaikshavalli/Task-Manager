import React, { useEffect, useState } from "react";
import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../services/mentorService.js";

const MentorCrud = () => {
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({ name: "", expertise: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const data = await getMentors();
      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMentor(editingId, formData);
      } else {
        await createMentor(formData);
      }
      setFormData({ name: "", expertise: "" });
      setEditingId(null);
      fetchMentors();
    } catch (error) {
      console.error("Error saving mentor:", error);
    }
  };

  const handleEdit = (mentor) => {
    setFormData({ name: mentor.name, expertise: mentor.expertise });
    setEditingId(mentor._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMentor(id);
      fetchMentors();
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Mentor Management</h2>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center mb-6 flex-wrap"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded-md flex-1"
          required
        />
        <input
          type="text"
          placeholder="Expertise"
          value={formData.expertise}
          onChange={(e) =>
            setFormData({ ...formData, expertise: e.target.value })
          }
          className="border p-2 rounded-md flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-3">
        {mentors.map((mentor) => (
          <li
            key={mentor._id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold">{mentor.name}</p>
              <p className="text-sm text-gray-600">{mentor.expertise}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(mentor)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(mentor._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorCrud;
