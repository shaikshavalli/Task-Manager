import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, Star, Edit2, Trash2, Plus } from 'lucide-react';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Curious George',
      title: 'UI/UX Design',
      tasks: 40,
      rating: 4.7,
      reviews: 750,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
    },
    {
      id: 2,
      name: 'Abraham Lincoln',
      title: '3D Design',
      tasks: 32,
      rating: 4.9,
      reviews: 510,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
    },
  ]);

  const [editingMentor, setEditingMentor] = useState(null);
  const [newMentor, setNewMentor] = useState({
    name: '',
    title: '',
    tasks: '',
    rating: '',
    reviews: '',
    avatar: '',
  });

  const handleAddMentor = () => {
    const id = mentors.length ? mentors[mentors.length - 1].id + 1 : 1;
    setMentors([...mentors, { ...newMentor, id, tasks: Number(newMentor.tasks), rating: Number(newMentor.rating), reviews: Number(newMentor.reviews) }]);
    setNewMentor({ name: '', title: '', tasks: '', rating: '', reviews: '', avatar: '' });
  };

  const handleDeleteMentor = (id) => {
    setMentors(mentors.filter(m => m.id !== id));
  };

  const handleEditMentor = (mentor) => {
    setEditingMentor(mentor);
  };

  const handleUpdateMentor = () => {
    setMentors(mentors.map(m => (m.id === editingMentor.id ? editingMentor : m)));
    setEditingMentor(null);
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
