import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, delta, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    teal: 'bg-teal-500'
  };

  const isPositive = delta >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(delta)}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last 7 days</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color] || 'bg-blue-500'}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
