import React from 'react'
import { Briefcase, MapPin, ExternalLink, Clock } from 'lucide-react';


interface Job {
  job_id: string;        
  job_title: string;     
  employer_name: string; 
  job_city: string;      
  job_apply_link: string; 
  job_posted_at_datetime_utc?: string; 
  job_description?: string;
}

interface JobMarketProps{
    jobs: Job[];
    onApply: (job:Job) => void;
}

export const JobMarket: React.FC<JobMarketProps> = ({jobs, onApply}) => {

    if(!jobs || jobs.length === 0){
        return <div className="text-gray-500 text-center py-4">No jobs found available right now.</div>;
    }

   return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
         <Briefcase className="text-blue-600" />
         Recommended Opportunities ({jobs.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, idx) => (
          <div key={job.job_id || idx} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 line-clamp-1" title={job.job_title}>
                    {job.job_title}
                </h3>
                {job.job_posted_at_datetime_utc && (
                    <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                        <Clock size={10} /> {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                    </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                 <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {job.employer_name}
                 </span>
                 <span className="flex items-center gap-1 text-gray-400">
                    <MapPin size={12} /> {job.job_city || 'Remote'}
                 </span>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-3 mb-4 h-12">
                 {/* Clean HTML tags if any, rough display */}
                 {job.job_description?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
              </p>
            </div>

            <button 
                onClick={() => onApply(job)}
                className="w-full mt-auto py-2 bg-gray-50 text-blue-600 font-semibold rounded-lg border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2"
            >
                Apply Now <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


