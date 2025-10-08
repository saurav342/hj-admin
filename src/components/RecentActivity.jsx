import React from 'react';
import { User, FileText, Clock } from 'lucide-react';

const RecentActivity = ({ title, data, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'signups':
        return User;
      case 'applications':
        return FileText;
      default:
        return Clock;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {type === 'signups' ? item.fullName || item.name : item.applicant?.fullName || item.applicant}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {type === 'signups' ? item.email : item.job?.title || item.jobTitle}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {item.time || new Date(item.createdAt || item.appliedAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Icon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
