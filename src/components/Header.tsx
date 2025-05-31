import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const { user } = useAuth();

  return (
    <header className={`py-4 px-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-b border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Smart Health</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          {user && (
            <div className="relative">
              <a
                href="/notifications"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;