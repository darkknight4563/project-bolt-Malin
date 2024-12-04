import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      setError('Failed to reset password. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-3xl font-light text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow p-8">
          {success ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Check Your Email</h3>
              <p className="text-slate-400 mb-6">
                We've sent password reset instructions to {email}
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setEmail('');
                    setSuccess(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white 
                    border border-white/10 rounded-md hover:bg-white/5 transition-colors"
                >
                  Try another email
                </button>
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-sm text-center text-white 
                    bg-violet-600 rounded-md hover:bg-violet-700 transition-colors"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 bg-white/5 border border-white/10 
                      rounded-md text-white placeholder-slate-500 focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
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
                {loading ? 'Sending...' : 'Reset Password'}
              </motion.button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Remember your password? Log in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
