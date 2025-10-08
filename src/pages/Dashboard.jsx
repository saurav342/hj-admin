import React, { useState, useEffect } from 'react';
import { Users, Building2, Briefcase, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';
import apiService from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobseekers: { count: 0, delta: 0 },
    totalCompanies: { count: 0, delta: 0 },
    totalJobs: { count: 0, delta: 0 },
    totalApplications: { count: 0, delta: 0 }
  });

  const [chartData, setChartData] = useState({
    jobseekersGrowth: [],
    companiesGrowth: [],
    applicationsByJob: []
  });

  const [recentActivity, setRecentActivity] = useState({
    signups: [],
    applications: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getDashboardStats();
      
      if (response.success) {
        const { stats: apiStats, charts, recentActivity: apiRecentActivity } = response.data;
        
        setStats(apiStats || {
          totalJobseekers: { count: 0, delta: 0 },
          totalCompanies: { count: 0, delta: 0 },
          totalJobs: { count: 0, delta: 0 },
          totalApplications: { count: 0, delta: 0 }
        });
        setChartData(charts || {
          jobseekersGrowth: [],
          companiesGrowth: [],
          applicationsByJob: []
        });
        setRecentActivity(apiRecentActivity || {
          signups: [],
          applications: []
        });
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
      // Set fallback data on error
      setStats({
        totalJobseekers: { count: 0, delta: 0 },
        totalCompanies: { count: 0, delta: 0 },
        totalJobs: { count: 0, delta: 0 },
        totalApplications: { count: 0, delta: 0 }
      });
      setChartData({
        jobseekersGrowth: [],
        companiesGrowth: [],
        applicationsByJob: []
      });
      setRecentActivity({
        signups: [],
        applications: []
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Jobseekers',
      value: stats.totalJobseekers.count,
      delta: stats.totalJobseekers.delta,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Companies',
      value: stats.totalCompanies.count,
      delta: stats.totalCompanies.delta,
      icon: Building2,
      color: 'green'
    },
    {
      title: 'Total Jobs',
      value: stats.totalJobs.count,
      delta: stats.totalJobs.delta,
      icon: Briefcase,
      color: 'purple'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications.count,
      delta: stats.totalApplications.delta,
      icon: FileText,
      color: 'orange'
    }
  ];

  // Transform API data for charts
  const transformJobseekersGrowth = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      name: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: item.count || 0
    }));
  };

  const transformApplicationsByJob = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      name: item._id || 'Unknown',
      value: item.count || 0
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error banner but still display dashboard
  const ErrorBanner = () => {
    if (!error) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-red-800 font-medium">Unable to load live data</div>
            <div className="text-red-600 text-sm mt-1">{error}</div>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your HappyJobs admin dashboard</p>
      </div>

      <ErrorBanner />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Jobseekers Growth (Last 30 Days)
          </h3>
          {transformJobseekersGrowth(chartData.jobseekersGrowth).length > 0 ? (
            <Chart 
              type="line" 
              data={transformJobseekersGrowth(chartData.jobseekersGrowth)} 
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>No growth data available</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Jobs by Applications
          </h3>
          {transformApplicationsByJob(chartData.applicationsByJob).length > 0 ? (
            <Chart 
              type="bar" 
              data={transformApplicationsByJob(chartData.applicationsByJob)} 
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>No application data available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity 
          title="Recent Signups" 
          data={recentActivity.signups} 
          type="signups" 
        />
        <RecentActivity 
          title="Recent Applications" 
          data={recentActivity.applications} 
          type="applications" 
        />
      </div>
    </div>
  );
};

export default Dashboard;
