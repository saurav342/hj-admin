import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import DataTable from '../components/DataTable';
import ProfileView from './ProfileView';
import apiService from '../services/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter
      };
      
      const response = await apiService.getApplications(params);
      
      if (response.success) {
        setApplications(response.data.applications);
        setTotalPages(response.data.pagination.pages);
        setTotal(response.data.pagination.total);
      } else {
        throw new Error(response.message || 'Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await apiService.updateApplicationStatus(applicationId, newStatus);
      if (response.success) {
        // Refresh the data
        fetchApplications();
      } else {
        throw new Error(response.message || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      setError(error.message);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'interview-scheduled':
        return <Clock className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'selected':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'shortlisted':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'interview-scheduled':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'reviewed':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'applicantName', label: 'Applicant' },
    { key: 'company', label: 'Company' },
    { key: 'appliedAt', label: 'Date Applied' },
    { key: 'status', label: 'Status' },
    { key: 'resume', label: 'Resume' },
    { key: 'actions', label: 'Actions' }
  ];

  const formatData = (data) => {
    return data.map(item => ({
      ...item,
      _id: item._id.slice(-8), // Show last 8 characters of ID
      jobTitle: item.job?.title || 'N/A',
      applicantName: item.applicant?.fullName || 'N/A',
      company: item.job?.company || 'N/A',
      appliedAt: new Date(item.appliedAt).toLocaleDateString(),
      status: (
        <div className="flex items-center space-x-2">
          {getStatusIcon(item.status)}
          <span className={getStatusBadge(item.status)}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
          </span>
        </div>
      ),
      resume: item.resume?.url ? (
        <a 
          href={item.resume.url} 
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText className="w-4 h-4" />
          <span>View Resume</span>
        </a>
      ) : (
        <span className="text-gray-400 text-sm">No resume</span>
      ),
      actions: (
        <div className="flex items-center space-x-2">
          <select
            value={item.status}
            onChange={(e) => updateApplicationStatus(item._id, e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview-scheduled">Interview Scheduled</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
          <button 
            onClick={() => setSelectedUserId(item.applicant?._id)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>
      )
    }));
  };

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting applications data...');
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
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-2">Manage job applications and status ({total} total)</p>
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
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview-scheduled">Interview Scheduled</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={formatData(applications)}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Applications;
