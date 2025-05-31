import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-4 px-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border-t border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-2 md:mb-0">
          &copy; {currentYear} Smart Health Monitoring. All rights reserved.
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-4">Made with</span>
          <Heart size={16} className="text-red-500 mr-1" />
          <span>for your wellbeing</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;