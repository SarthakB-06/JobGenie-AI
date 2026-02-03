import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Brain, Zap, Target, Shield, Clock, Upload, FileText, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white relative selection:bg-blue-100">

      {/* Background design */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid Pattern - using Tailwind arbitrary values */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        {/* Radial Gradient - Center */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

        {/* Side blobs */}
        <div className="absolute right-0 top-0 -z-10 h-screen w-screen overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] h-125 w-125 rounded-full bg-purple-100/50 blur-[80px]"></div>
          <div className="absolute top-[20%] -left-[10%] h-100 w-100 rounded-full bg-blue-100/50 blur-[80px]"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/70 backdrop-blur-md border-b border-gray-100/50 sticky top-0">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">JobGenie.AI</span>
            </div>
            <Link
              to="/login"
              className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-slate-600 font-medium mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-sm">Boost Your Career</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Make Your Resume
            <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
              Impossible to Ignore
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Beat the Application Tracking Systems (ATS) with AI-powered optimization. Get matched with jobs that actually fit your profile.
          </p>

          <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-1"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 px-6">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" /> Free
              </span>
              {/* <span className="w-1 h-1 bg-slate-300 rounded-full"></span> */}
              
            </div>
          </div>

          {/* Grid of stats/trust */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200/60 pt-12">
            <div className="flex flex-col items-center p-4">
              <span className="text-3xl font-bold text-slate-900">3x</span>
              <span className="text-slate-500 text-sm mt-1">More Interviews</span>
            </div>
            <div className="flex flex-col items-center p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-200/60">
              <span className="text-3xl font-bold text-slate-900">60s</span>
              <span className="text-slate-500 text-sm mt-1">Analysis Time</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <span className="text-3xl font-bold text-slate-900">95%</span>
              <span className="text-slate-500 text-sm mt-1">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 bg-white/50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How JobGenie Works</h2>
            <p className="text-lg text-slate-600">Optimization in three simple steps</p>
          </div>

          <div className="space-y-6">
            <StepCard
              step="01"
              icon={<Upload className="w-6 h-6 text-white" />}
              iconBg="bg-blue-500"
              title="Upload Your Resume"
              desc="Drop your current CV. We support PDF and DOCX formats. Our parser extracts your skills instantly."
            />
            <div className="h-8 border-l-2 border-dashed border-gray-200 ml-8 md:ml-13"></div>
            <StepCard
              step="02"
              icon={<Brain className="w-6 h-6 text-white" />}
              iconBg="bg-indigo-500"
              title="AI Gap Analysis"
              desc="We compare your profile against real world job descriptions to find missing keywords and weak points."
            />
            <div className="h-8 border-l-2 border-dashed border-gray-200 ml-8 md:ml-13"></div>
            <StepCard
              step="03"
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              iconBg="bg-green-500"
              title="Get Ranked Higher"
              desc="Receive a tailored optimization plan that helps you pass ATS filters and reach human recruiters."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose JobGenie?</h2>
            <p className="text-lg text-slate-600">Built for the modern job market</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Target className="w-6 h-6 text-blue-600" />}
              title="Sniper Precision"
              desc="Don't spray and pray. Target jobs that actually match your skill set with 90%+ accuracy."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-indigo-600" />}
              title="ATS Proofing"
              desc="Our algorithms are trained on the same systems recruiters use to filter candidates."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-purple-600" />}
              title="Smart Suggestions"
              desc="Get real-time feedback on formatting, word choice, and bullet point impact."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-emerald-600" />}
              title="Save Time"
              desc="Stop rewriting resumes from scratch. Optimize your master resume in seconds."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
            {/* Background blobbiness within card */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to get hired?</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of professionals who improved their interview rate by over 200%.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                Boost My Resume Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-8 text-sm text-slate-500">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">JobGenie.AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 JobGenie.AI. Empowering Careers.</p>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ step, icon, iconBg, title, desc }: { step: string; icon: any; iconBg: string; title: string; desc: string }) => (
  <div className="flex items-start gap-6 relative group">
    <div className={`flex items-center justify-center w-14 h-14 ${iconBg} rounded-2xl shadow-lg shadow-blue-500/20 shrink-0 z-10 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="flex-1 pt-2">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {step}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed max-w-xl">{desc}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
  </div>
);



export default LandingPage;