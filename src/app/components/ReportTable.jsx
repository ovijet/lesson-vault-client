import React from 'react';
import { FiEye, FiTrash2, FiCheckCircle } from 'react-icons/fi';

export default function ReportTable({ reports, loading, onView, onAction }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm text-gray-500">
        No reported lessons found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">Lesson Title</th>
              <th className="p-4">Reported By</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700 text-sm">
            {reports.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{item.lessonTitle || "Untitled"}</td>
                <td className="p-4 text-gray-500">{item.email}</td>
                <td className="p-4 text-gray-500">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onView(item)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
                    title="View Details"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAction({ open: true, type: 'resolve', lesson: item })}
                    className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-all"
                    title="Dismiss / Resolve"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAction({ open: true, type: 'delete', lesson: item })}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                    title="Delete Lesson"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}