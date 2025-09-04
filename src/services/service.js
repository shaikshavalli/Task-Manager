import axios from "axios";

const API_URL = "http://localhost:5000/api/mentors";

export const getMentors = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMentor = async (mentor) => {
  const res = await axios.post(API_URL, mentor);
  return res.data;
};

export const updateMentor = async (id, mentor) => {
  const res = await axios.put(`${API_URL}/${id}`, mentor);
  return res.data;
};

export const deleteMentor = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
