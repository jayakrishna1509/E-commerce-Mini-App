import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserPlus } from 'lucide-react';
import { Toast } from '../components/Toast';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // Focus on input when mounted
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setToast({ message: 'Please Enter Username', type: 'error' });
      return;
    }

    if (!email.trim()) {
      setToast({ message: 'Please Enter Email', type: 'error' });
      return;
    }

    if (!validateEmail(email)) {
      setToast({ message: 'Please Enter a Valid Email', type: 'error' });
      return;
    }

    if (!password.trim()) {
      setToast({ message: 'Please Enter Password', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setToast({ message: 'Password Must be at Least 6 Characters', type: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ message: 'Passwords do not Match', type: 'error' });
      return;
    }

    setIsLoading(true);

    // Simulate registration delay
    setTimeout(() => {
      login(username);
      setToast({ message: 'Registration Successful! Welcome!', type: 'success' });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 sm:p-8 border dark:border-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-600 text-white p-3 rounded-lg mb-4">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Join us for an Amazing Experience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Your Password"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Password Must be at Least 6 Characters
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 sm:py-2.5 rounded-lg font-bold text-sm sm:text-base text-white transition ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
