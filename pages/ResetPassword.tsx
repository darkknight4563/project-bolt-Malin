import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmPasswordReset } = useAuth();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      navigate('/forgot-password');
    }
  }, [oobCode, navigate]);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      return;
    }

    try {
      setError('');
      setLoading(true);
      await confirmPasswordReset(oobCode!, password);
      setSuccess(true);
    } catch (error) {
      setError('Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  if (!oobCode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <h2 className="text-3xl font-light text-white">Create New Password</h2>
          <p className="mt-2 text-sm text-slate-400">
            Please enter and confirm your new password.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow p-8">
          {success ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Password Reset Successfully</h3>
              <p className="text-slate-400 mb-6">
                Your password has been reset. You can now log in with your new password.
              </p>
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-sm text-center text-white 
                  bg-violet-600 rounded-md hover:bg-violet-700 transition-colors"
              >
                Continue to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-sm font-medium text-red-400">Error</span>
                  </div>
                  <div className="ml-8 text-sm text-red-400 whitespace-pre-line">
                    {error}
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 pr-10 bg-white/5 border border-white/10 
                      rounded-md text-white placeholder-slate-500 focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter new password"
                    disabled={loading}
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-200">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 bg-white/5 border border-white/10 
                      rounded-md text-white placeholder-slate-500 focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Confirm new password"
                    disabled={loading}
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-violet-600 
                  rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 
                  disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
