import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Palette } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      applicationAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      dataRetention: 365
    },
    appearance: {
      theme: 'light',
      sidebarCollapsed: false,
      compactMode: false
    }
  });

  const handleSave = () => {
    // Implement settings save
    console.log('Saving settings:', settings);
  };

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your admin dashboard preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive email alerts for important events</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser push notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => handleChange('notifications', 'pushNotifications', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Weekly Reports</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly dashboard reports</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.weeklyReports}
                onChange={(e) => handleChange('notifications', 'weeklyReports', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="input w-full"
                min="5"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleChange('security', 'passwordExpiry', parseInt(e.target.value))}
                className="input w-full"
                min="30"
                max="365"
              />
            </div>
          </div>
        </div>

        {/* System */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Auto Backup</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup data</p>
              </div>
              <input
                type="checkbox"
                checked={settings.system.autoBackup}
                onChange={(e) => handleChange('system', 'autoBackup', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => handleChange('system', 'backupFrequency', e.target.value)}
                className="input w-full"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.system.dataRetention}
                onChange={(e) => handleChange('system', 'dataRetention', parseInt(e.target.value))}
                className="input w-full"
                min="30"
                max="1095"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Theme
              </label>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
                className="input w-full"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Sidebar Collapsed</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Start with sidebar collapsed</p>
              </div>
              <input
                type="checkbox"
                checked={settings.appearance.sidebarCollapsed}
                onChange={(e) => handleChange('appearance', 'sidebarCollapsed', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Compact Mode</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use compact spacing</p>
              </div>
              <input
                type="checkbox"
                checked={settings.appearance.compactMode}
                onChange={(e) => handleChange('appearance', 'compactMode', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
