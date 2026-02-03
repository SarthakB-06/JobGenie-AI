import { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import UploadZone from '../components/resume/UploadZone.js';
import JobPreferencesForm from '../components/dashboard/JobPreferenceForm.js';
import API from '../services/api.js';
import { CheckCircle, AlertCircle, MapPin, ArrowLeft, Target, TrendingUp, Sparkles, Building2, Zap, Rocket, BarChart3, Users } from 'lucide-react';
import { Navbar } from '../components/common/Navbar.js';
import { JobMarket } from '../components/dashboard/JobMarket.js';

const Dashboard = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [resumeData, setResumeData] = useState<any>(null);
  const [marketBenchmark, setMarketBenchmark] = useState('');
  const [showJobs, setShowJobs] = useState(false);

  // ... Keep all handlers exactly the same ...
  const handleJobSearch = async (criteria: any) => {
    setLoadingJobs(true);
    try {
      const { data } = await API.post('/jobs/search', criteria)
      setJobs(data)
      const aggregatedText = data.map((j: any) => j.job_description).join(' ')
      setMarketBenchmark(aggregatedText)
      setStep(2)
    } catch (error) {
      console.error('Job search error:', error);
      alert('Failed to fetch jobs. Please try again.')
      setStep(2)
    } finally {
      setLoadingJobs(false);
    }
  }

  const onAnalysisComplete = (data: any) => {
    setResumeData(data);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleApply = (job: any) => {
    const url = job.job_apply_link || job.job_google_link || job.url;
    url ? window.open(url, '_blank') : alert('No application link available.');
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-[radial-linear(circle_at_1px_1px,rgb(148,163,184,0.15)_1px,transparent_0)] background-size-[24px_24px] pointer-events-none"></div>

      <main className="relative z-10">

        {/* STEP 1: Landing Hero */}
        {step === 1 && (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center p-8">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-medium mb-8">
                <Sparkles size={16} className="text-blue-500" />
                AI-Powered Resume Optimization
              </div>

              {/* Hero Text */}
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Get Your Resume
                <br />
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Interview Ready
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                Match your profile against live job data. Get personalized feedback.
                <br className="hidden md:block" />
                Beat the ATS algorithms every time.
              </p>

              {/* Search Card */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-900/10 border border-gray-200/50 p-8 backdrop-blur-sm">
                  <JobPreferencesForm onSubmit={handleJobSearch} loading={loadingJobs} />
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time Job Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>AI-Powered Analysis</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Analysis Mode */}
        {step === 2 && (
          <div className="py-12 px-4">
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Market Analysis</h2>
                  <p className="text-gray-600">We found {jobs.length} active positions matching your criteria</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="self-start px-4 py-2 text-gray-600 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-300 rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <ArrowLeft size={16} /> Edit Search
                </button>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">

                {/* Left Sidebar: Job Feed */}
                <div className="lg:col-span-4">

                  {/* Stats Card */}
                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-lg text-white">
                        <BarChart3 size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">Live Market Data</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{jobs.length}</div>
                    <p className="text-sm text-blue-700/80">Active job postings analyzed</p>
                  </div>

                  {/* Job List */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-medium text-gray-900 text-sm flex items-center gap-2">
                        <Users size={14} />
                        Current Opportunities
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {jobs.map((job: any, index: number) => (
                        <div key={index} className="p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs shrink-0">
                              {job.employer_name?.[0] || <Building2 size={14} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm mb-1">
                                {job.job_title}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                {job.employer_name} • {job.job_city || 'Remote'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Main: Upload */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-2xl shadow-lg shadow-gray-900/5 border border-gray-200 p-8 h-full">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className="text-yellow-500" size={24} />
                        Optimize Your Resume
                      </h3>
                      <p className="text-gray-600">
                        Upload your resume to see how it performs against the current market standards
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <UploadZone onAnalysisComplete={onAnalysisComplete} initialJobDescription={marketBenchmark} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Modern Results */}
        {step === 3 && resumeData && (
          <div className="py-12 px-4">
            <div className="max-w-6xl mx-auto">

              <button
                onClick={() => setStep(2)}
                className="mb-8 group text-gray-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Upload
              </button>

              {/* Results Header */}
              <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white mb-10 relative overflow-hidden">
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <g fill="none" fillRule="evenodd">
                      <g fill="#ffffff">
                        <circle cx="7" cy="7" r="1" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-blue-100 text-sm font-medium mb-4">
                      <Sparkles size={14} /> Analysis Complete
                    </div>
                    <h2 className="text-4xl font-bold mb-3">Resume Score Report</h2>
                    <p className="text-blue-100 text-lg opacity-90">
                      Your profile has been analyzed against {jobs.length} real job postings
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <div className="relative">
                      <svg className="w-48 h-48 transform -rotate-90">
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="8" fill="transparent"
                          strokeDasharray={2 * Math.PI * 80}
                          strokeDashoffset={2 * Math.PI * 80 * (1 - resumeData.ats_score / 100)}
                          className={`${resumeData.ats_score >= 70 ? 'text-green-400' : 'text-yellow-400'} transition-all duration-1000 ease-out`}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold">{resumeData.ats_score}</span>
                        <span className="text-sm opacity-80">out of 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">

                {/* Issues */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                      <AlertCircle size={20} />
                    </div>
                    Areas for Improvement
                  </h3>

                  <div className="space-y-4">
                    {resumeData.feedback?.length > 0 ? (
                      resumeData.feedback.map((item: string, i: number) => (
                        <div key={i} className="flex gap-4 items-start p-4 bg-red-50 rounded-xl border border-red-100">
                          <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No critical issues found.</p>
                    )}

                    {resumeData.missing_skills?.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-600 mb-3">Missing Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.missing_skills.map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <CheckCircle size={20} />
                    </div>
                    Your Strengths
                  </h3>

                  <div className="space-y-6">
                    <div className="p-4 bg-linear-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                      <p className="text-gray-700 italic leading-relaxed">
                        "{resumeData.summary}"
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-3">Matched Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.key_skills?.map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs Section */}
              {resumeData.ats_score > 75 ? (
                <div className="bg-white rounded-2xl shadow-lg shadow-gray-900/5 border border-gray-200 overflow-hidden">
                  {!showJobs ? (
                    <div className="py-16 px-8 text-center bg-linear-to-br from-gray-50 to-blue-50">
                      <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Rocket size={24} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Apply!</h3>
                      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Your resume is optimized and ready. View the curated job opportunities that match your profile.
                      </p>
                      <button
                        onClick={() => setShowJobs(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all"
                      >
                        View {jobs.length} Opportunities <TrendingUp size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Recommended Jobs</h3>
                        <button
                          onClick={() => setShowJobs(false)}
                          className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                      <JobMarket jobs={jobs} onApply={handleApply} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                  <AlertCircle size={32} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="font-bold text-gray-600">Jobs Locked</h3>
                  <p className="text-gray-500">Improve your score to unlock job opportunities</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard;