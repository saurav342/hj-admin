// API service for HappyJobs Admin Dashboard
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dashboard APIs
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  // Jobseekers APIs
  async getJobseekers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/jobseekers${queryString ? `?${queryString}` : ''}`);
  }

  // Companies APIs
  async getCompanies(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/companies${queryString ? `?${queryString}` : ''}`);
  }

  // Jobs APIs
  async getJobs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getJobDetails(jobId) {
    return this.request(`/admin/jobs/${jobId}`);
  }

  // Applications APIs
  async getApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/applications${queryString ? `?${queryString}` : ''}`);
  }

  async updateApplicationStatus(applicationId, status) {
    return this.request(`/admin/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // User Management APIs
  async toggleUserStatus(userId) {
    return this.request(`/admin/users/${userId}/toggle-status`, {
      method: 'PATCH',
    });
  }

  async getUserProfile(userId) {
    return this.request(`/admin/users/${userId}/profile`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
