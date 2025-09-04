import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, Filter, Play, Pause, Volume2, Maximize, Upload } from 'lucide-react';

const DetailTask: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([1, 2, 3, 4]);
  const [progress, setProgress] = useState(20);
  
  const checklist = [
    { id: 1, text: 'Understanding the tools in Figma', completed: true },
    { id: 2, text: 'Understand the basics of making designs', completed: true },
    { id: 3, text: 'Design a mobile application with figma', completed: true },
    { id: 4, text: 'Presenting the design flow', completed: true },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  
  const toggleChecklistItem = (itemId: number) => {
    setCheckedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen">
      <Header title="Detail Task" />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Task"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>Category</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Sort By: Deadline</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="relative bg-gray-900 aspect-video">
                <img
                  src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-opacity"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    
                    <div 
                      className="flex-1 bg-white bg-opacity-20 rounded-full h-1 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const newProgress = ((e.clientX - rect.left) / rect.width) * 100;
                        setProgress(Math.max(0, Math.min(100, newProgress)));
                      }}
                    >
                      <div className="bg-white h-1 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                    </div>
                    
                    <span className="text-white text-sm">
                      {Math.floor((progress / 100) * 600 / 60)}:{String(Math.floor((progress / 100) * 600 % 60)).padStart(2, '0')}/10:00
                    </span>
                    
                    <div className="flex space-x-2">
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <Volume2 size={16} />
                      </button>
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <Maximize size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Creating Awesome Mobile Apps</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">UI/UX Design</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">Apps Design</span>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  + Get Mentors
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>👥</span>
                  <span>200 Students Involved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>1 Hour</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Follow the video tutorial above. Understand how to use each tool in the Figma application. 
                  Also learn how to make a good and correct design. Starting from spacing, typography, content, 
                  and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Essence of Assessment</h3>
                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          checkedItems.includes(item.id) ? 'bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}>
                        {checkedItems.includes(item.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <span className={checkedItems.includes(item.id) ? 'text-gray-900' : 'text-gray-600'}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Assigned Assignments</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Creating Awesome Mobile Apps</h4>
                <p className="text-sm text-gray-600">UI/UX Design • Apps Design</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Detail Student</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Student's name</span>
                    <span className="text-sm font-medium text-gray-900">Dennis Nzioki</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Student Class</span>
                    <span className="text-sm font-medium text-gray-900">MIPA 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Student Number</span>
                    <span className="text-sm font-medium text-gray-900">10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">File Task</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Modified</span>
                  <span className="text-gray-900">1 July 2022</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">File submissions</label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Upload size={20} className="text-gray-400" />
                  </div>
                  
                  {uploadedFile ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">File uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">*Drag or browse from device</p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Browse files
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;