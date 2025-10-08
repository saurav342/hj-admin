import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, loading, currentPage, totalPages, onPageChange }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-accent-700">
              {columns.map((column) => (
                <td key={column.key}>
                  {typeof row[column.key] === 'object' && row[column.key] !== null
                    ? row[column.key]
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-accent-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-accent-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentPage}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-accent-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-accent-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
