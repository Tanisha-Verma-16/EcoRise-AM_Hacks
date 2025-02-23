import React, { useState } from 'react';
import { Award } from 'lucide-react';
import SmartCityGame from './SmartCityGame';
import ClimateQuiz from './ClimateQuiz';

const ClimateHub = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const [coins, setCoins] = useState(0);

  const handleCoinEarned = (amount : number) => {
    setCoins(prev => prev + amount);
  };

  // Custom Tree icon since we can't use TreePine
  const TreeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path d="M12 3L4 15h16L12 3z" />
      <path d="M12 15v6" />
      <path d="M8 15h8" />
    </svg>
  );

  // Custom City icon since we can't use City
  const CityIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path d="M4 21h16" />
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 9v3" />
    </svg>
  );

  const renderContent = () => {
    if (selectedActivity === 'quiz') {
      return <ClimateQuiz onCoinEarned={handleCoinEarned} />;
    }
    if (selectedActivity === 'game') {
      return <SmartCityGame />;
    }

    return (
      <div className="bg - green-200 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        <button
          onClick={() => setSelectedActivity('quiz')}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/90 to-teal-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src="https://images.unsplash.com/photo-1584266463340-53b684c6ee9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xpbWF0ZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Climate Quiz" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="bg-white/95 group-hover:bg-white/100 rounded-xl p-6 transform transition-all duration-300">
              <Award className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Climate Quiz Challenge</h3>
              <p className="text-gray-600">
                Test your knowledge about climate change and earn coins. 
                Can you score 100%?
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedActivity('game')}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/90 to-indigo-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img 
            src="https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBjaXR5fGVufDB8fDB8fHww" 
            alt="Smart City Builder" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="bg-white/95 group-hover:bg-white/100 rounded-xl p-6 transform transition-all duration-300">
              <CityIcon />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart City Builder</h3>
              <p className="text-gray-600">
                Build an eco-friendly city while managing resources and energy. 
                Balance growth with sustainability!
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TreeIcon />
            <h1 className="text-3xl font-bold text-gray-800">Climate Learning Hub</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn about climate change and sustainability through interactive games and quizzes.
          </p>
          {coins > 0 && (
            <div className="mt-4 inline-block bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-yellow-700 font-semibold">🪙 {coins} coins earned!</span>
            </div>
          )}
          {selectedActivity && (
            <button
              onClick={() => setSelectedActivity(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Menu
            </button>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default ClimateHub;
