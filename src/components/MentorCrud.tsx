import { useEffect, useState } from "react";
import { getMentors, createMentor, updateMentor, deleteMentor } from "../services/service.js";

interface Mentor {
  _id?: string;
  name: string;
  title: string;
  tasks: number;
  rating: number;
  reviews: number;
  avatar: string;
}

const MentorCrud = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [formData, setFormData] = useState<Mentor>({
    name: "",
    title: "",
    tasks: 0,
    rating: 0,
    reviews: 0,
    avatar: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load mentors on mount
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const data = await getMentors();
    setMentors(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateMentor(editingId, formData);
      setEditingId(null);
    } else {
      await createMentor(formData);
    }
    setFormData({ name: "", title: "", tasks: 0, rating: 0, reviews: 0, avatar: "" });
    fetchMentors();
  };

  const handleEdit = (mentor: Mentor) => {
    setFormData(mentor);
    setEditingId(mentor._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteMentor(id);
    fetchMentors();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mentor Management</h2>

      {/* Mentor Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="tasks"
          value={formData.tasks}
          onChange={handleChange}
          placeholder="Tasks"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="reviews"
          value={formData.reviews}
          onChange={handleChange}
          placeholder="Reviews"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update Mentor" : "Add Mentor"}
        </button>
      </form>

      {/* Mentor List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Tasks</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Reviews</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor._id}>
              <td className="border p-2">
                <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="border p-2">{mentor.name}</td>
              <td className="border p-2">{mentor.title}</td>
              <td className="border p-2">{mentor.tasks}</td>
              <td className="border p-2">{mentor.rating}</td>
              <td className="border p-2">{mentor.reviews}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(mentor)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mentor._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorCrud;
