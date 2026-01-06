import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Search, Upload, FileText } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Stop Applying Blindly. <br />
              <span className="text-blue-600">Hack the ATS.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              JobGenie AI analyzes the job market <i>first</i>, then tailors your resume to match specific roles. 
              Unlock hidden opportunities with a resume that actually passes the filter.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">The Smart Workflow</h2>
            <p className="text-gray-500 mt-2">Most people upload first. We analyze first.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard 
              icon={<Search className="w-8 h-8 text-blue-600" />}
              title="1. Define Your Target"
              desc="Tell us the role, location, and experience level you want. We fetch live market data."
            />
            <StepCard 
              icon={<Upload className="w-8 h-8 text-blue-600" />}
              title="2. Upload & Analyze"
              desc="Our AI compares your resume against the 'Golden Standard' of those specific active jobs."
            />
            <StepCard 
              icon={<FileText className="w-8 h-8 text-blue-600" />}
              title="3. Unlock & Apply"
              desc="Fix the gaps our AI finds. Once your score hits 80%, job links unlock for one-click application."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;