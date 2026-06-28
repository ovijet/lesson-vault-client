import React from 'react';
import { FiX } from 'react-icons/fi';

export default function InvestigationModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden p-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <FiX className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Report Investigation</h3>
        
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Lesson ID</span>
            <p className="text-gray-800 font-mono text-sm bg-gray-50 p-2 rounded-lg mt-1">{report.lessonId}</p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Lesson Title</span>
            <p className="text-gray-800 font-medium mt-1">{report.lessonTitle || "Untitled"}</p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Reporter Email</span>
            <p className="text-gray-600 mt-1">{report.email}</p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Reported At</span>
            <p className="text-gray-600 mt-1">
              {report.createdAt ? new Date(report.createdAt).toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-sm"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}