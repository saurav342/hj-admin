import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, MoreHorizontal, Eye, ToggleLeft, ToggleRight, Building2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import apiService from '../services/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, searchTerm]);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm
      };
      
      const response = await apiService.getCompanies(params);
      
      if (response.success) {
        setCompanies(response.data.companies);
        setTotalPages(response.data.pagination.pages);
        setTotal(response.data.pagination.total);
      } else {
        throw new Error(response.message || 'Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompanyStatus = async (companyId) => {
    try {
      const response = await apiService.toggleUserStatus(companyId);
      if (response.success) {
        // Refresh the data
        fetchCompanies();
      } else {
        throw new Error(response.message || 'Failed to toggle company status');
      }
    } catch (error) {
      console.error('Error toggling company status:', error);
      setError(error.message);
    }
  };

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'fullName', label: 'Contact Person' },
    { key: 'email', label: 'Email' },
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
            <Building2 className="w-4 h-4 text-green-500" />
          ) : (
            <Building2 className="w-4 h-4 text-red-500" />
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
            onClick={() => console.log('View company:', item._id)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button 
            onClick={() => toggleCompanyStatus(item._id)}
            className={`px-3 py-1 rounded text-xs font-medium ${
              item.isActive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {item.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      )
    }));
  };

  const handleExport = () => {
    // Implement CSV export
    console.log('Exporting companies data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-2">Manage company accounts and profiles ({total} total)</p>
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
                placeholder="Search companies..."
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
          data={formatData(companies)}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Companies;
