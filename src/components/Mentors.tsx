import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Search, Star, Edit2, Trash2, Plus } from 'lucide-react';
import { getMentors, createMentor, updateMentor, deleteMentor } from '../services/mentorService';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState([]);
  const [editingMentor, setEditingMentor] = useState(null);
  const [newMentor, setNewMentor] = useState({
    name: '',
    title: '',
    tasks: '',
    rating: '',
    reviews: '',
    avatar: '',
  });

  // Fetch mentors from backend
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await getMentors();
      setMentors(res.data);
    } catch (err) {
      console.error('Error fetching mentors:', err);
    }
  };

  const handleAddMentor = async () => {
    try {
      const res = await createMentor({
        ...newMentor,
        tasks: Number(newMentor.tasks),
        rating: Number(newMentor.rating),
        reviews: Number(newMentor.reviews)
      });
      setMentors([...mentors, res.data]);
      setNewMentor({ name: '', title: '', tasks: '', rating: '', reviews: '', avatar: '' });
    } catch (err) {
      console.error('Error adding mentor:', err);
    }
  };

  const handleDeleteMentor = async (id) => {
    try {
      await deleteMentor(id);
      setMentors(mentors.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting mentor:', err);
    }
  };

  const handleEditMentor = (mentor) => setEditingMentor(mentor);

  const handleUpdateMentor = async () => {
    try {
      const res = await updateMentor(editingMentor.id, editingMentor);
      setMentors(mentors.map(m => (m.id === res.data.id ? res.data : m)));
      setEditingMentor(null);
    } catch (err) {
      console.error('Error updating mentor:', err);
    }
  };

  const filteredMentors = mentors.filter(
    mentor =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header title="Mentors" />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Add Mentor Form */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-2 items-center">
          <input type="text" placeholder="Name" value={newMentor.name} onChange={e => setNewMentor({...newMentor, name: e.target.value})} className="border px-2 py-1 rounded" />
          <input type="text" placeholder="Title" value={newMentor.title} onChange={e => setNewMentor({...newMentor, title: e.target.value})} className="border px-2 py-1 rounded" />
          <input type="number" placeholder="Tasks" value={newMentor.tasks} onChange={e => setNewMentor({...newMentor, tasks: e.target.value})} className="border px-2 py-1 rounded" />
          <input type="number" step="0.1" placeholder="Rating" value={newMentor.rating} onChange={e => setNewMentor({...newMentor, rating: e.target.value})} className="border px-2 py-1 rounded" />
          <input type="number" placeholder="Reviews" value={newMentor.reviews} onChange={e => setNewMentor({...newMentor, reviews: e.target.value})} className="border px-2 py-1 rounded" />
          <input type="text" placeholder="Avatar URL" value={newMentor.avatar} onChange={e => setNewMentor({...newMentor, avatar: e.target.value})} className="border px-2 py-1 rounded" />
          <button onClick={handleAddMentor} className="bg-blue-600 text-white px-4 py-1 rounded flex items-center space-x-1">
            <Plus size={16} /> <span>Add</span>
          </button>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow relative">
              {editingMentor?.id === mentor.id ? (
                <div className="space-y-2">
                  <input type="text" value={editingMentor.name} onChange={e => setEditingMentor({...editingMentor, name: e.target.value})} className="border px-2 py-1 rounded w-full" />
                  <input type="text" value={editingMentor.title} onChange={e => setEditingMentor({...editingMentor, title: e.target.value})} className="border px-2 py-1 rounded w-full" />
                  <input type="number" value={editingMentor.tasks} onChange={e => setEditingMentor({...editingMentor, tasks: Number(e.target.value)})} className="border px-2 py-1 rounded w-full" />
                  <input type="number" step="0.1" value={editingMentor.rating} onChange={e => setEditingMentor({...editingMentor, rating: Number(e.target.value)})} className="border px-2 py-1 rounded w-full" />
                  <input type="number" value={editingMentor.reviews} onChange={e => setEditingMentor({...editingMentor, reviews: Number(e.target.value)})} className="border px-2 py-1 rounded w-full" />
                  <input type="text" value={editingMentor.avatar} onChange={e => setEditingMentor({...editingMentor, avatar: e.target.value})} className="border px-2 py-1 rounded w-full" />
                  <div className="flex justify-between mt-2">
                    <button onClick={handleUpdateMentor} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={() => setEditingMentor(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tasks</span>
                      <span className="font-medium text-gray-900">{mentor.tasks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{mentor.rating}</span>
                      </div>
                      <span className="text-gray-600">({mentor.reviews} Reviews)</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditMentor(mentor)} className="flex-1 bg-yellow-400 text-white px-3 py-1 rounded flex items-center justify-center space-x-1">
                      <Edit2 size={16} /> <span>Edit</span>
                    </button>
                    <button onClick={() => handleDeleteMentor(mentor.id)} className="flex-1 bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center space-x-1">
                      <Trash2 size={16} /> <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
