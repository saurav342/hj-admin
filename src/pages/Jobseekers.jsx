import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, MoreHorizontal, UserCheck, UserX } from 'lucide-react';
import DataTable from '../components/DataTable';
import ProfileView from './ProfileView';
import apiService from '../services/api';

const Jobseekers = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchJobseekers();
  }, [currentPage, searchTerm]);

  const fetchJobseekers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm
      };
      
      const response = await apiService.getJobseekers(params);
      
      if (response.success) {
        setJobseekers(response.data.jobseekers);
        setTotalPages(response.data.pagination.pages);
        setTotal(response.data.pagination.total);
      } else {
        throw new Error(response.message || 'Failed to fetch jobseekers');
      }
    } catch (error) {
      console.error('Error fetching jobseekers:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const response = await apiService.toggleUserStatus(userId);
      if (response.success) {
        // Refresh the data
        fetchJobseekers();
      } else {
        throw new Error(response.message || 'Failed to toggle user status');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      setError(error.message);
    }
  };

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'city', label: 'Location' },
    { key: 'createdAt', label: 'Signup Date' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ];

  const formatData = (data) => {
    return data.map(item => ({
      ...item,
      _id: item._id.slice(-8), // Show last 8 characters of ID
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      status: (
        <div className="flex items-center space-x-2">
          {item.isActive ? (
            <UserCheck className="w-4 h-4 text-green-500" />
          ) : (
            <UserX className="w-4 h-4 text-red-500" />
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {item.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
      actions: (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => toggleUserStatus(item._id)}
            className={`px-3 py-1 rounded text-xs font-medium ${
              item.isActive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {item.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button 
            onClick={() => setSelectedUserId(item._id)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View Profile
          </button>
        </div>
      )
    }));
  };

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting jobseekers data...');
  };

  // Show profile view if a user is selected
  if (selectedUserId) {
    return (
      <ProfileView 
        userId={selectedUserId} 
        onClose={() => setSelectedUserId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobseekers</h1>
          <p className="text-gray-600 mt-2">Manage job seeker accounts ({total} total)</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">Error</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobseekers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={formatData(jobseekers)}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Jobseekers;
