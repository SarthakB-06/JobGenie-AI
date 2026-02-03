import React from 'react';
import { Briefcase, MapPin, ExternalLink, Clock, Building2 } from 'lucide-react';

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_apply_link: string;
  job_posted_at_datetime_utc?: string;
  job_description?: string;
}

interface JobMarketProps {
  jobs: Job[];
  onApply: (job: Job) => void;
}

export const JobMarket: React.FC<JobMarketProps> = ({ jobs, onApply }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Briefcase size={24} />
             </div>
             <div>
                Recommended Opportunities
                <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {jobs.length} found
                </span>
             </div>
          </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {jobs.map((job, idx) => (
          <div 
            key={job.job_id || idx} 
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4">
               <div className="flex items-start gap-4">
                  {/* Company Logo Placeholder */}
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                     {job.employer_name.substring(0, 1) || <Building2 />}
                  </div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors" title={job.job_title}>
                        {job.job_title}
                      </h3>
                      <p className="text-sm font-medium text-slate-600 mt-1">{job.employer_name}</p>
                  </div>
               </div>
               
               {job.job_posted_at_datetime_utc && (
                 <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md shrink-0">
                    {new Date(job.job_posted_at_datetime_utc).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                 </span>
               )}
            </div>
            
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
                 <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                    <MapPin size={12} /> {job.job_city || 'Remote'}
                 </span>
                 <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                    <Briefcase size={12} /> Full Time
                 </span>
            </div>
            
            <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed flex-grow">
               {job.job_description 
                 ? job.job_description.replace(/<[^>]*>?/gm, '').substring(0, 140) + "..." 
                 : "No description available for this position."}
            </p>

            <button 
                onClick={() => onApply(job)}
                className="w-full py-2.5 bg-slate-50 text-slate-700 font-bold rounded-lg border border-slate-200 
                group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 
                active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
                View & Apply <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};