import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mentors';

export const getMentors = () => axios.get(API_URL);
export const createMentor = (mentor) => axios.post(API_URL, mentor);
export const updateMentor = (id, mentor) => axios.put(`${API_URL}/${id}`, mentor);
export const deleteMentor = (id) => axios.delete(`${API_URL}/${id}`);
