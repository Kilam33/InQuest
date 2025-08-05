import { useState } from 'react';
import { 
  Brain, Bell, Settings, User, LogOut,
  ChevronDown, Edit, Languages, Eye, Moon, Sun, Circle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}


const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadNotifications] = useState(3); // Mock unread notifications count
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: 'New comment on your research paper',
      time: '5m ago',
      unread: true
    },
    {
      id: 2,
      message: 'Project deadline approaching',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      message: 'New collaboration request',
      time: '2h ago',
      unread: false
    }
  ];

  return (
    <nav className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Brain className={`h-8 w-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`ml-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              InQuest
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${
                isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full ${
                  isDark 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg py-1 z-50 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 flex items-start space-x-3 ${
                        notification.unread 
                          ? isDark 
                            ? 'bg-purple-900/20' 
                            : 'bg-purple-50'
                          : isDark
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Unread indicator */}
                      {notification.unread && (
                        <Circle className={`w-2 h-2 mt-1.5 flex-shrink-0 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      )}
                      <div>
                        <p className={isDark ? 'text-gray-200' : 'text-gray-800'}>
                          {notification.message}
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  isDark 
                    ? 'text-gray-200 hover:bg-gray-800' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      isDark
                        ? 'text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => navigate('/account')}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Account
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      isDark
                        ? 'text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      isDark
                        ? 'text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Accessibility
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      isDark
                        ? 'text-gray-200 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    Language
                  </button>
                  <hr className={`my-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;