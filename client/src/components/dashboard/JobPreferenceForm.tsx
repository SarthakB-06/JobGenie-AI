import { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface JobPreferencesProps {
  onSubmit: (criteria: any) => void;
  loading: boolean;
}

const JobPreferencesForm = ({ onSubmit, loading }: JobPreferencesProps) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: 'Full-time',
    experienceLevel: 'Mid Level'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">What are you looking for?</h2>
        <p className="text-gray-500 mt-2">We'll analyze the market to find the perfect match criteria.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Target Job Title</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. Full Stack Developer"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Preferred Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. Remote, New York, London"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Job Type</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Part-time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Experience Level</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
            >
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
              <option>Executive</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading ? 'Analyzing Market...' : 'Find Jobs & Set Benchmark'}
        </button>
      </form>
    </div>
  );
};

export default JobPreferencesForm;