import { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import UploadZone from '../components/resume/UploadZone.js';
import JobPreferencesForm from '../components/dashboard/JobPreferenceForm.js';
import API from '../services/api.js';
import { CheckCircle, AlertCircle, Briefcase, MapPin, ArrowLeft } from 'lucide-react';


const Dashboard = () => {
    const {user, logout} = useAuth();
    
    const [step, setStep] = useState(1);
    const [loadingJobs, setLoadingJobs] = useState(false);

    // data
    const [jobs , setJobs] = useState<any[]>([]);
    const [resumeData, setResumeData] = useState<any>(null);
    const [marketBenchmark, setMarketBenchmark] = useState('');


    const handleJobSearch = async(criteria:any) => {
      setLoadingJobs(true);
      try{
        const {data} = await API.post('/jobs/search' , criteria)
        setJobs(data)

        const aggregatedText = data.slice(0,5).map((j:any) => j.job_description).join(' ')
        setMarketBenchmark(aggregatedText)
        setStep(2)
      }catch(error){
        console.error('Job search error:', error);
        alert('Failed to fetch jobs. Please try again.')
        setStep(2)
      }finally{
        setLoadingJobs(false);
      }
    }

    const onAnalysisComplete = (data:any) => {
      setResumeData(data);
      setStep(3)
    }

    return (
        <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">JobGenie AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button 
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {step === 1 && (
          <div className='animate-fade-in'>
            <JobPreferencesForm onSubmit={handleJobSearch} loading={loadingJobs} />
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <button 
                  onClick={() => setStep(1)} 
                  className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 mb-4"
                >
                  <ArrowLeft className="w-4 h-4" /> Change Search
                </button>
                <h3 className="font-bold text-gray-900">Live Market Data</h3>
                <p className="text-sm text-gray-500 mb-4">We found {jobs.length} jobs matching your profile.</p>
                
                <div className="space-y-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                  {jobs.map((job: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded border border-gray-100 text-sm">
                      <div className="font-semibold text-gray-800 truncate">{job.job_title}</div>
                      <div className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                        <Briefcase className="w-3 h-3" /> {job.employer_name}
                      </div>
                      <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {job.job_city || 'Remote'}
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && <p className="text-sm text-gray-400">No jobs found (using generic benchmark)</p>}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Optimize for this Market</h2>
                <p className="text-gray-600 mb-6">
                  We have built a "Golden Standard" based on these {jobs.length} jobs. Upload your resume to see how you stack up.
                </p>
                <UploadZone 
                  onAnalysisComplete={onAnalysisComplete} 
                  initialJobDescription={marketBenchmark}
                />
              </div>
            </div>
          </div>
        )}
        

        {step === 3 && resumeData && (
          <div className='animate-fade-in space-y-8'>
            <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-4">
               <button 
                 onClick={() => setStep(2)} 
                 className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
               >
                 <ArrowLeft className="w-4 h-4" /> Back to Upload
               </button>
             </div>
          </div>
          {/* score header */}
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Match Score</h2>
                <p className="text-gray-500">Based on market analysis of {jobs.length} jobs</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className={`text-5xl font-extrabold ${resumeData.atsScore >= 70 ? 'text-green-600' : 'text-orange-500'}`}>
                    {resumeData.atsScore}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">/ 100 Score</div>
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Improvements Needed
                </h3>
                <ul className="space-y-3">
                  {resumeData.analysisResults?.feedback?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 bg-red-50 p-3 rounded-lg border border-red-100">
                      <span className="mt-1.5 block w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                  {/* Show missing skills if available */}
                  {resumeData.analysisResults?.missing_skills?.map((skill: string, index: number) => (
                     <li key={`miss-${index}`} className="flex items-start gap-3 text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
                     <span className="mt-1.5 block w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                     Missing Skill: <strong>{skill}</strong>
                   </li>
                  ))}
                </ul>
              </div>

               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Positive Signals
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 italic">"{resumeData.analysisResults?.summary}"</p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Detected Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.analysisResults?.key_skills?.map((skill: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {resumeData.atsScore >= 75 ? (
               <div className="text-center py-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 You matched the Market Standard!</h3>
                 <p className="text-gray-600 mb-6">The job listings are now unlocked for express application.</p>
                 <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all">
                   View & Apply to {jobs.length} Jobs
                 </button>
               </div>
            ) : (
              <div className="text-center py-10 opacity-75">
                  <h3 className="text-xl font-bold text-gray-600 mb-2">🔒 Job Listings Locked</h3>
                  <p className="text-gray-500">
                  Improve your score to 75+ to unlock one-click applications.
                  </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    )
}

export default Dashboard