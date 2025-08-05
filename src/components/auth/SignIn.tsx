import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';
import { Brain, Moon, Sun } from 'lucide-react';
import ForgotPassword from './ForgotPassword'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence); // Ensure local persistence
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Ensure local persistence
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google.');
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Logo and Dark Mode Toggle */}
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
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Sign In Form */}
      <div className="flex items-center justify-center">
        <div className={`p-8 rounded-lg shadow-md w-96 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Sign In</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-purple-600 hover:underline mt-1"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Sign In
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <FcGoogle size={20} className="mr-2" />
            Sign In with Google
          </button>
          <p className={`mt-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} isDark={isDark} />
      )}
    </div>
  );
};

export default SignIn;