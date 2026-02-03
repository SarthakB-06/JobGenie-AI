import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api.js';
import { useAuth } from '../context/AuthContext.js';
import { Brain, AlertCircle, Eye, EyeOff, ArrowRight, FileText, Target, TrendingUp, Users } from 'lucide-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };
      const { data } = await API.post(endpoint, payload);

      if (data.token) {
        login(data.token, { _id: data._id, name: data.name, email: data.email });
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100">
    
    {/* Main Container */}
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

      {/* Left Side – Modern Marketing Section */}
      <div className="hidden lg:flex flex-col justify-between p-14 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative">

        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>

        {/* Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">JobGenie.AI</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4">
            {isRegister ? 'Build a smarter career' : 'Welcome back 👋'}
          </h1>

          <p className="text-white/80 text-lg max-w-md">
            AI-powered resume insights, ATS scoring, and job matching —
            everything you need to move faster in your career.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative z-10 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-white/80" />
            Smart Resume Analysis
          </div>
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-white/80" />
            Personalized Job Matching
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-white/80" />
            ATS & Career Score
          </div>
        </div>
      </div>

      {/* Right Side – Auth Form */}
      <div className="flex items-center justify-center p-10 sm:p-14 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">JobGenie.AI</span>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                !isRegister ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                isRegister ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {isRegister ? 'Create an account' : 'Sign in to your account'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {isRegister
                ? 'Start your AI-powered career journey'
                : 'Welcome back, continue where you left off'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex gap-3">
              <AlertCircle className="text-red-500 shrink-0" size={18} />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -tra-gray-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
            >
              {loading ? 'Processing…' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

};

export default Login;