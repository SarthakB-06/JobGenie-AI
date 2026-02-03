import { useEffect, useState } from "react";
import { UploadCloud, Loader2, FileText, AlertCircle, Sparkles, FileType } from "lucide-react";
import API from "../../services/api.js";

interface UploadZoneProps {
    onAnalysisComplete: (data: any) => void;
    initialJobDescription?: string;
}

const UploadZone = ({ onAnalysisComplete, initialJobDescription = '' }: UploadZoneProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [jobDescription, setJobDescription] = useState(initialJobDescription);

    // Sync prop changes to state
    useEffect(() => {
        if (initialJobDescription) {
            setJobDescription(initialJobDescription);
        }
    }, [initialJobDescription]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!jobDescription.trim()) {
            setError('Please provide a job description context first.');
            return;
        }

        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        try {
            // Note: Ensure this endpoint matches your backend route (/resume/upload or /resumes/upload)
            const { data } = await API.post('/resumes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onAnalysisComplete(data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            setLoading(false);
            // Reset input value so same file can be selected again if needed
            e.target.value = '';
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 animate-slide-up">
            
            {/* 1. Job Context Section */}
            <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-200 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 rounded-t-xl flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Sparkles size={16} className="text-blue-600" />
                        Target Job Context
                    </label>
                    <span className="text-xs text-slate-400 font-medium">Auto-filled from job search</span>
                </div>
                <textarea
                    className="w-full h-32 p-4 text-sm text-slate-600 placeholder-slate-400 bg-white rounded-b-xl focus:outline-none resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Describe the job you are applying for, or paste the job description here..."
                />
            </div>

            {/* 2. Upload Area */}
            <div className="relative group">
                <div 
                    className={`
                        relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
                        flex flex-col items-center justify-center min-h-[280px] p-8 text-center
                        ${loading 
                            ? 'bg-slate-50 border-slate-300 md:cursor-wait' 
                            : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg lg:cursor-pointer'
                        }
                    `}
                >
                    {/* Decorative Background Blob */}
                    <div className="absolute w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />

                    {loading ? (
                        <div className="z-10 flex flex-col items-center animate-pulse">
                            <div className="relative w-16 h-16 mb-6">
                                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <Loader2 className="absolute inset-0 m-auto text-blue-600 animate-spin-slow" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Analyzing Profile</h3>
                            <p className="text-slate-500 mt-2">Comparing skills against market data...</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <UploadCloud className="w-10 h-10 text-blue-600" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                                Upload Resume
                            </h3>
                            
                            <p className="text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
                                Drop your PDF here to check your ATS score.
                            </p>

                            <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><FileType size={14}/> PDF</span>
                                <span className="w-1 h-1 bg-slate-400 rounded-full"/>
                                <span className="flex items-center gap-1"><FileText size={14}/> DOCX</span>
                            </div>

                            {/* HIDDEN INPUT - Retaining original functionality */}
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                disabled={loading}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="animate-fade-in flex items-center gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm font-medium">
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                </div>
            )}
        </div>
    );
};

export default UploadZone;