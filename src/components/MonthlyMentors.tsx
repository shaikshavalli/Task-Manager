import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

const MonthlyMentors: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [followedMentors, setFollowedMentors] = useState<number[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mentors");
        setMentors(res.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  const toggleFollow = (mentorId: number) => {
    setFollowedMentors((prev) =>
      prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  const visibleMentors = mentors.slice(currentIndex, currentIndex + 2);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Mentors</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(mentors.length - 2, currentIndex + 1))}
            disabled={currentIndex >= mentors.length - 2}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleMentors.map((mentor, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(mentor._id)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
                  followedMentors.includes(mentor._id)
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {followedMentors.includes(mentor._id) ? 'Followed' : '+ Follow'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 align-middle"></span>
                <span>{mentor.tasks} Tasks</span>
              </div>

              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="font-medium">{mentor.rating}</span>
                <span>({mentor.reviews} Reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyMentors;
