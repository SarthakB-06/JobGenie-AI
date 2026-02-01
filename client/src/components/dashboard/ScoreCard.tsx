import { CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

interface ScoreCardProps {
    score: number;
    skills: string[];
    missing: string[];
    feedback: {
        summary?: string;
        strengths?: string[];
        weaknesses?: string[];
        suggestion?: string;
    };
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, skills, missing, feedback }) => {

    // Determine color based on score
    const getScoreColor = (s: number) => {
        if (s >= 75) return 'text-green-600 border-green-600';
        if (s >= 50) return 'text-orange-500 border-orange-500';
        return 'text-red-500 border-red-500';
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ATS Analysis Report</h2>

                {/* Animated Score Circle */}
                <div className={`w-40 h-40 rounded-full border-8 flex items-center justify-center mx-auto mb-4 bg-gray-50 bg-opacity-50 ${getScoreColor(score)}`}>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-extrabold">{score}</span>
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mt-1">/ 100</span>
                    </div>
                </div>

                <p className={`font-medium ${score >= 75 ? 'text-green-600' : 'text-gray-500'}`}>
                    {score >= 75 ? "Excellent Match! 🎉" : "Needs Optimization 🔧"}
                </p>
            </div>

            <div className="space-y-6">

                {/* Found Skills */}
                <div className="text-left">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-3 border-b pb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Matched Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {skills && skills.length > 0 ? (
                            skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))
                        ) : <span className="text-gray-400 text-sm italic">No specific keywords matched yet.</span>}
                    </div>
                </div>

                {/* Missing Skills */}
                <div className="text-left">
                    <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-3 border-b pb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {missing && missing.length > 0 ? (
                            missing.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-green-600 text-sm italic">No major skills missing!</span>
                        )}
                    </div>
                </div>

                {/* AI Feedback Section */}
                {feedback && (
                    <div className="mt-6 bg-indigo-50 p-5 rounded-lg border border-indigo-100 text-left">
                        <h4 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            AI Career Insight
                        </h4>

                        {/* Summary */}
                        <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                            {feedback.summary || "Generating insights..."}
                        </p>

                        {/* Specific Weaknesses List */}
                        {feedback.weaknesses && feedback.weaknesses.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs font-bold uppercase text-indigo-400 mb-2">Detailed Improvements:</p>
                                <ul className="space-y-1 pl-1">
                                    {feedback.weaknesses.map((w, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-indigo-900">
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></span>
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actionable Suggestion */}
                        {feedback.suggestion && (
                            <div className="bg-white bg-opacity-60 p-3 rounded border border-indigo-200 flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0" />
                                <p className="text-sm font-medium text-indigo-900 italic">
                                    "{feedback.suggestion}"
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};