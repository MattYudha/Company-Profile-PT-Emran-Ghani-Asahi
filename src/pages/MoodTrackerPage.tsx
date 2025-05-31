import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';

const MOOD_OPTIONS = [
  { value: 1, label: 'Very Low', emoji: '😣', color: 'bg-red-500' },
  { value: 2, label: 'Low', emoji: '😔', color: 'bg-orange-500' },
  { value: 3, label: 'Neutral', emoji: '😐', color: 'bg-yellow-500' },
  { value: 4, label: 'Good', emoji: '🙂', color: 'bg-green-400' },
  { value: 5, label: 'Excellent', emoji: '😁', color: 'bg-green-600' },
];

interface MoodEntry {
  date: string;
  value: number;
  notes: string;
  factors: string[];
}

const MoodTrackerPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [factors, setFactors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Demo mood history data
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: '2025-05-28', value: 4, notes: 'Had a productive day at work.', factors: ['Work', 'Exercise'] },
    { date: '2025-05-27', value: 3, notes: 'Feeling a bit tired.', factors: ['Sleep'] },
    { date: '2025-05-26', value: 5, notes: 'Great day out with friends.', factors: ['Social', 'Weather'] },
    { date: '2025-05-25', value: 2, notes: 'Stressed about upcoming deadlines.', factors: ['Work', 'Stress'] },
  ]);

  const possibleFactors = [
    'Sleep', 'Work', 'Exercise', 'Diet', 'Social', 'Weather', 'Health', 'Stress'
  ];

  const handleFactorToggle = (factor: string) => {
    if (factors.includes(factor)) {
      setFactors(factors.filter(f => f !== factor));
    } else {
      setFactors([...factors, factor]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMood === null) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry: MoodEntry = {
      date: today,
      value: selectedMood,
      notes,
      factors
    };
    
    // In a real app, you would save this to your API
    // For demo, we'll just add it to our state
    setMoodHistory([newEntry, ...moodHistory]);
    
    // Reset form
    setSelectedMood(null);
    setNotes('');
    setFactors([]);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">Mood Tracker</h1>
        <p className="opacity-90">Track your daily mood and identify patterns.</p>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fade-in">
          <div className="flex items-center">
            <Check className="mr-2" size={20} />
            <p>Your mood has been logged successfully!</p>
          </div>
        </div>
      )}
      
      {/* Mood tracking form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Mood selection */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-between gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex-1 min-w-[100px] py-4 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                    selectedMood === mood.value 
                      ? `${mood.color} text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-${mood.color}` 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Factors */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What factors are affecting your mood today?
            </label>
            <div className="flex flex-wrap gap-2">
              {possibleFactors.map((factor) => (
                <button
                  key={factor}
                  type="button"
                  onClick={() => handleFactorToggle(factor)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    factors.includes(factor)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Add any thoughts or details about your day..."
            />
          </div>
          
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={selectedMood === null}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                selectedMood === null
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              Log Your Mood
            </button>
          </div>
        </form>
      </div>
      
      {/* Mood history */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
        
        {moodHistory.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6">
            No mood entries yet. Start tracking your mood above!
          </p>
        ) : (
          <div className="space-y-4">
            {moodHistory.map((entry, index) => {
              const mood = MOOD_OPTIONS.find(m => m.value === entry.value);
              
              return (
                <div 
                  key={index} 
                  className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${mood?.color} flex items-center justify-center text-white text-xl`}>
                        {mood?.emoji}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{mood?.label}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={14} className="mr-1" />
                          <span>{entry.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {entry.notes && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300">{entry.notes}</p>
                  )}
                  
                  {entry.factors.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {entry.factors.map(factor => (
                        <span key={factor} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                          {factor}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <div className="text-center mt-6">
              <a href="#" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                View complete history →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTrackerPage;