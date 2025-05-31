import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded shadow-lg flex items-center max-w-sm animate-slide-in-bottom z-50">
      <WifiOff size={20} className="mr-3 flex-shrink-0" />
      <div>
        <p className="font-medium">You're offline</p>
        <p className="text-sm">Changes will be saved and synced when you're back online</p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="ml-3 text-amber-700 hover:text-amber-900"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default OfflineIndicator;