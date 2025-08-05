// Header.tsx
import React from 'react';
import { Brain, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
            <Brain className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`ml-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              InQuest
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => navigate('/signin')}
            className={`px-4 py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;