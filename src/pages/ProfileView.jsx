import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Languages, 
  FileText, 
  Award, 
  Clock,
  Download,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import apiService from '../services/api';

const ProfileView = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getUserProfile(userId);
      if (response.success) {
        setProfile(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (isActive) => {
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? (
          <>
            <CheckCircle className="w-4 h-4 mr-1" />
            Active
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 mr-1" />
            Inactive
          </>
        )}
      </div>
    );
  };

  const getVerificationBadge = (isVerified) => {
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isVerified 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isVerified ? (
          <>
            <CheckCircle className="w-4 h-4 mr-1" />
            Verified
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 mr-1" />
            Unverified
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Profile View</h1>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(profile.isActive)}
              {getVerificationBadge(profile.isVerified)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt={profile.fullName}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{profile.fullName || 'N/A'}</h2>
                    <p className="text-blue-100 capitalize">{profile.userType || 'User'}</p>
                    <p className="text-blue-100 text-sm">
                      Member since {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{profile.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profile.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      {profile.location?.city && profile.location?.state 
                        ? `${profile.location.city}, ${profile.location.state}`
                        : profile.city || 'Not specified'
                      }
                    </p>
                  </div>
                </div>

                {profile.address && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg mt-1">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{profile.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-900">
                    {profile.yearsOfExperience || 0} years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Skills</span>
                  <span className="font-semibold text-gray-900">
                    {profile.skills?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-semibold text-gray-900">
                    {profile.languages?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-semibold text-gray-900">
                    {profile.lastLogin ? formatDate(profile.lastLogin) : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <p className="text-gray-900">{profile.age || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <p className="text-gray-900 capitalize">{profile.gender || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <p className="text-gray-900">{formatDate(profile.dateOfBirth)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <p className="text-gray-900 capitalize">{profile.availability || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-3 text-green-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {profile.languages && profile.languages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Languages className="h-6 w-6 mr-3 text-purple-600" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-indigo-600" />
                  Education
                </h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-indigo-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{edu.level}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {edu.yearOfPassing && `Passed in ${edu.yearOfPassing}`}
                        {edu.percentage && ` • ${edu.percentage}%`}
                        {edu.board && ` • ${edu.board}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {profile.experience && profile.experience.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 mr-3 text-orange-600" />
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-orange-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{exp.jobTitle}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      {exp.description && (
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Preferences */}
            {profile.jobPreferences && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-3 text-yellow-600" />
                  Job Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.jobPreferences.jobType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                      <p className="text-gray-900 capitalize">{profile.jobPreferences.jobType}</p>
                    </div>
                  )}
                  {profile.jobPreferences.workTiming && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Timing</label>
                      <p className="text-gray-900 capitalize">{profile.jobPreferences.workTiming}</p>
                    </div>
                  )}
                  {profile.jobPreferences.salaryRange && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                      <p className="text-gray-900">
                        ₹{profile.jobPreferences.salaryRange.min?.toLocaleString()} - 
                        ₹{profile.jobPreferences.salaryRange.max?.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {profile.jobPreferences.willingToTravel !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Willing to Travel</label>
                      <p className="text-gray-900">{profile.jobPreferences.willingToTravel ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-gray-600" />
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">Resume</span>
                  </div>
                  {profile.resume?.uri ? (
                    <a
                      href={profile.resume.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </a>
                  ) : (
                    <span className="text-gray-400">Not uploaded</span>
                  )}
                </div>
                
                {profile.documents?.aadhaar?.uri && (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">Aadhaar</span>
                    </div>
                    <a
                      href={profile.documents.aadhaar.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </a>
                  </div>
                )}
                
                {profile.documents?.drivingLicense?.uri && (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">Driving License</span>
                    </div>
                    <a
                      href={profile.documents.drivingLicense.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
