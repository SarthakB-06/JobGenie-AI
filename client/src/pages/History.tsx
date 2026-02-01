import { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar.js';
import { HistoryCard } from '../components/dashboard/HistoryCard.js';
import { ScoreCard } from '../components/dashboard/ScoreCard.js';
import API from '../services/api.js';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const History = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedScan, setSelectedScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch History on Mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/resumes/history');
        setHistory(data);
        // Automatically select the most recent one if available
        if (data.length > 0) {
          setSelectedScan(data[0]);
        }
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const requestSelection = (id: string) => {
    const found = history.find(h => h._id === id);
    if (found) setSelectedScan(found);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
            <p className="text-gray-500">Review your past resume analyses</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">No scans found</h3>
            <p className="text-gray-500 mb-6">You haven't analyzed any resumes yet.</p>
            <Link to="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
            
            {/* LEFT: Scrollable List */}
            <div className="lg:col-span-1 border-r border-gray-200 pr-4 overflow-y-auto space-y-4 custom-scrollbar">
              {history.map((item) => (
                <HistoryCard 
                  key={item._id} 
                  item={item} 
                  isActive={selectedScan?._id === item._id}
                  onClick={requestSelection}
                />
              ))}
            </div>

            {/* RIGHT: Detail View */}
            <div className="lg:col-span-2 overflow-y-auto">
              {selectedScan && (
                <div className="animate-fade-in">
                   <h2 className="text-xl font-bold mb-4 text-gray-800">
                      Results for {selectedScan.fileName}
                   </h2>
                   
                   <ScoreCard 
                    score={selectedScan.atsScore}
                    // Map MongoDB CamelCase -> Component Props
                    skills={selectedScan.extractedSkills || []}
                    missing={selectedScan.missingSkills || []}
                    feedback={{
                      summary: selectedScan.aiFeedback?.summary || "No summary available",
                      weaknesses: selectedScan.aiFeedback?.weaknesses || [],
                      suggestion: selectedScan.aiFeedback?.suggestion || ""
                    }}
                   />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};