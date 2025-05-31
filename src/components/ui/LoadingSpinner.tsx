import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'teal'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 'w-5 h-5';
      case 'large': return 'w-12 h-12';
      default: return 'w-8 h-8';
    }
  };
  
  const getColor = () => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'red': return 'border-red-500';
      case 'teal': return 'border-teal-500';
      default: return 'border-teal-500';
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`${getSize()} animate-spin rounded-full border-4 border-solid ${getColor()} border-t-transparent`}></div>
    </div>
  );
};

export default LoadingSpinner;