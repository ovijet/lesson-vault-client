import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ConfirmationModal({ modal, setModal, refresh }) {
  const [actionLoading, setActionLoading] = useState(false);

  if (!modal.open) return null;

  const handleConfirmAction = async () => {
    try {
      setActionLoading(true);
      
      if (modal.type === 'delete') {
        // ১. লেসন ডিলিট করার এপিআই কল (আপনার অলরেডি সার্ভারে app.delete("/addLesson/:id") আছে)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addLesson/${modal.lesson.lessonId}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          toast.success("Lesson deleted and community safe!");
        } else {
          throw new Error();
        }
      } else if (modal.type === 'resolve') {
        // ২. রিপোর্টটি ডিসমিস বা রিমুভ করার লজিক (ডেটাবেজ থেকে রিপোর্ট কালেকশন ডিলিট)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/resolve-report/${modal.lesson._id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          toast.success("Report marked as resolved.");
        } else {
          throw new Error();
        }
      }

      // মডাল বন্ধ করা এবং লিস্ট রিফ্রেশ করা
      setModal({ open: false, type: '', lesson: null });
      refresh();
    } catch (err) {
      toast.error("Failed to process action");
    } finally {
      setActionLoading(false);
    }
  };

  const isDelete = modal.type === 'delete';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl p-6 text-center animate-in fade-in zoom-in-95 duration-150">
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {isDelete ? "Delete Content?" : "Dismiss Report?"}
        </h3>
        
        <p className="text-gray-500 text-sm mb-6">
          {isDelete 
            ? `Are you sure you want to permanently delete "${modal.lesson?.lessonTitle}"? This cannot be undone.`
            : `Are you sure you want to dismiss the report for "${modal.lesson?.lessonTitle}"?`
          }
        </p>

        <div className="flex gap-3 justify-center">
          <button
            disabled={actionLoading}
            onClick={() => setModal({ open: false, type: '', lesson: null })}
            className="px-4 py-2 border rounded-xl hover:bg-gray-50 font-semibold text-gray-600 transition-all text-sm w-full"
          >
            Cancel
          </button>
          
          <button
            disabled={actionLoading}
            onClick={handleConfirmAction}
            className={`px-4 py-2 font-semibold text-white rounded-xl transition-all text-sm w-full shadow-sm ${
              isDelete 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {actionLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}