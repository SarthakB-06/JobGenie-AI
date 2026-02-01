import React from 'react';
import { FileText, Calendar, ChevronRight } from 'lucide-react';

interface HistoryItem {
  _id: string;
  fileName: string;
  atsScore: number;
  uploadDate: string;
  targetJobContext: string;
}

interface HistoryCardProps {
  item: HistoryItem;
  onClick: (id: string) => void;
  isActive: boolean;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onClick, isActive }) => {
  // Format date to look nice (e.g., "Oct 24, 2023")
  const date = new Date(item.uploadDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      onClick={() => onClick(item._id)}
      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
        isActive 
          ? 'bg-blue-50 border-blue-500 shadow-sm' 
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
            <FileText size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 truncate max-w-37.5">{item.fileName}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar size={12} />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* Mini Score Badge */}
          <div className={`px-2 py-1 rounded text-xs font-bold ${
            item.atsScore >= 75 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {item.atsScore}%
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
      
      {/* Job Title / Context Preview */}
      <p className="mt-2 text-xs text-gray-500 line-clamp-1">
        Target: {item.targetJobContext.substring(0, 40) || "General Role"}...
      </p>
    </div>
  );
};