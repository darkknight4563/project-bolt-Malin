import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Moon,
  Palette,
  Globe,
  CheckCircle,
  X
} from 'lucide-react';
import ProfileProgress from '../components/ProfileProgress';
import ReminderSettings from '../components/ReminderSettings';

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ElementType;
}

const sections: ProfileSection[] = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'security', title: 'Security', icon: Shield },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'appearance', title: 'Appearance', icon: Palette },
  { id: 'privacy', title: 'Privacy', icon: Lock },
  { id: 'language', title: 'Language & Region', icon: Globe },
];

export default function Profile() {
  const { currentUser, userSettings, updateUserSettings, updateUserPassword } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [fullName, setFullName] = useState(userSettings?.fullName || '');
  const [bio, setBio] = useState(userSettings?.bio || '');
  const [darkMode, setDarkMode] = useState(userSettings?.darkMode || false);
  const [language, setLanguage] = useState(userSettings?.language || 'en');
  const [timezone, setTimezone] = useState(userSettings?.timezone || 'UTC');
  const [dataSharing, setDataSharing] = useState(userSettings?.dataSharing || true);
  const [activityVisible, setActivityVisible] = useState(userSettings?.activityVisible || true);
  const [dateFormat, setDateFormat] = useState(userSettings?.dateFormat || 'mdy');
  const [theme, setTheme] = useState(userSettings?.theme || 'Default');
  const [fontSize, setFontSize] = useState(userSettings?.fontSize || 16);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userSettings) {
      setFullName(userSettings.fullName);
      setBio(userSettings.bio);
      setDarkMode(userSettings.darkMode);
      setLanguage(userSettings.language);
      setTimezone(userSettings.timezone);
      setDataSharing(userSettings.dataSharing);
      setActivityVisible(userSettings.activityVisible);
      setDateFormat(userSettings.dateFormat);
      setTheme(userSettings.theme);
      setFontSize(userSettings.fontSize);
    }
  }, [userSettings]);

  const showNotification = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 5000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserSettings({
        fullName,
        bio,
      });
      showNotification('Profile updated successfully');
    } catch (error) {
      showNotification('Failed to update profile', true);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match', true);
      return;
    }
    try {
      await updateUserPassword(newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showNotification('Password updated successfully');
    } catch (error) {
      showNotification('Failed to update password', true);
    }
  };

  const handleAppearanceUpdate = async (updates: Partial<typeof userSettings>) => {
    try {
      await updateUserSettings(updates);
      showNotification('Appearance settings updated');
    } catch (error) {
      showNotification('Failed to update appearance settings', true);
    }
  };

  const handlePrivacyUpdate = async (updates: Partial<typeof userSettings>) => {
    try {
      await updateUserSettings(updates);
      showNotification('Privacy settings updated');
    } catch (error) {
      showNotification('Failed to update privacy settings', true);
    }
  };

  const handleLanguageUpdate = async (updates: Partial<typeof userSettings>) => {
    try {
      await updateUserSettings(updates);
      showNotification('Language settings updated');
    } catch (error) {
      showNotification('Failed to update language settings', true);
    }
  };

  const renderPersonalInfo = () => (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-200">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            value={currentUser?.email || ''}
            disabled
            className="block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
              text-slate-200 disabled:opacity-50"
          />
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Your email is verified and cannot be changed
        </p>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-200">
          Full Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
              text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-slate-200">
          Bio
        </label>
        <div className="mt-1">
          <textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
              text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Brief description for your profile
        </p>
      </div>

      <div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white 
            bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
            focus-visible:ring-violet-500"
        >
          Save Changes
        </motion.button>
      </div>
    </form>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {activeSection === 'notifications' && (
        <div className="space-y-6">
          <ReminderSettings />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Other Notifications</h3>
            {[
              'Weekly Progress Summary',
              'Community Updates',
              'New Resources Available',
              'Session Reminders',
              'Tips & Recommendations'
            ].map((item) => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.toLowerCase().replace(/\s+/g, '-')}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-violet-600 
                    focus:ring-violet-500 focus:ring-offset-0"
                />
                <label
                  htmlFor={item.toLowerCase().replace(/\s+/g, '-')}
                  className="ml-3 text-sm text-slate-200"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white 
            bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
            focus-visible:ring-violet-500"
        >
          Save Preferences
        </motion.button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-200">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="mt-4 space-y-4">
          <div>
            <label htmlFor="old-password" className="block text-sm font-medium text-slate-200">
              Current Password
            </label>
            <input
              type="password"
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
                text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-slate-200">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
                text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-200">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
                text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white 
              bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
              focus-visible:ring-violet-500"
          >
            Update Password
          </motion.button>
        </form>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Two-Factor Authentication</h3>
        <p className="mt-1 text-sm text-slate-400">
          Add an extra layer of security to your account
        </p>
        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white 
              bg-violet-600 border border-transparent rounded-md hover:bg-violet-700 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
              focus-visible:ring-violet-500"
          >
            Enable 2FA
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-200">Theme</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-200">Dark Mode</span>
            <button
              onClick={() => handleAppearanceUpdate({ darkMode: !darkMode })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full
                ${darkMode ? 'bg-violet-600' : 'bg-white/10'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                  ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Color Scheme</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {['Default', 'Ocean', 'Sunset', 'Forest', 'Lavender', 'Midnight'].map((themeOption) => (
            <motion.button
              key={themeOption}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAppearanceUpdate({ theme: themeOption })}
              className={`p-4 text-sm text-slate-200 rounded-lg
                ${theme === themeOption ? 'bg-violet-600' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {themeOption}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Font Size</h3>
        <div className="mt-4">
          <input
            type="range"
            min="12"
            max="20"
            value={fontSize}
            onChange={(e) => handleAppearanceUpdate({ fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="mt-2 text-sm text-slate-400">
            Current size: {fontSize}px
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-200">Data Sharing</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="data-sharing"
              checked={dataSharing}
              onChange={(e) => handlePrivacyUpdate({ dataSharing: e.target.checked })}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-violet-600 
                focus:ring-violet-500 focus:ring-offset-0"
            />
            <label htmlFor="data-sharing" className="ml-3 text-sm text-slate-200">
              Share anonymous usage data to help improve our services
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Profile Visibility</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="activity-visible"
              checked={activityVisible}
              onChange={(e) => handlePrivacyUpdate({ activityVisible: e.target.checked })}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-violet-600 
                focus:ring-violet-500 focus:ring-offset-0"
            />
            <label htmlFor="activity-visible" className="ml-3 text-sm text-slate-200">
              Make my activity visible to other community members
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-200">Language</h3>
        <div className="mt-4">
          <select
            value={language}
            onChange={(e) => handleLanguageUpdate({ language: e.target.value })}
            className="block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
              text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Time Zone</h3>
        <div className="mt-4">
          <select
            value={timezone}
            onChange={(e) => handleLanguageUpdate({ timezone: e.target.value })}
            className="block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md 
              text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Paris">Paris (CET)</option>
            <option value="Asia/Tokyo">Tokyo (JST)</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-lg font-medium text-slate-200">Date Format</h3>
        <div className="mt-4 space-y-4">
          {[
            { id: 'mdy', label: 'MM/DD/YYYY', example: '12/31/2023' },
            { id: 'dmy', label: 'DD/MM/YYYY', example: '31/12/2023' },
            { id: 'ymd', label: 'YYYY-MM-DD', example: '2023-12-31' }
          ].map((format) => (
            <div key={format.id} className="flex items-center">
              <input
                type="radio"
                id={format.id}
                name="date-format"
                checked={dateFormat === format.id}
                onChange={() => handleLanguageUpdate({ dateFormat: format.id })}
                className="h-4 w-4 border-white/10 bg-white/5 text-violet-600 
                  focus:ring-violet-500 focus:ring-offset-0"
              />
              <label htmlFor={format.id} className="ml-3 text-sm text-slate-200">
                {format.label} <span className="text-slate-400">({format.example})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'security':
        return renderSecurity();
      case 'notifications':
        return renderNotifications();
      case 'appearance':
        return renderAppearance();
      case 'privacy':
        return renderPrivacy();
      case 'language':
        return renderLanguage();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-400">This section is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-green-900/20 border border-green-900/30 rounded-lg flex items-center"
          >
            <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
            <span className="text-green-400">{successMessage}</span>
            <button
              onClick={() => setSuccessMessage('')}
              className="ml-auto text-green-400 hover:text-green-300"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-900/20 border border-red-900/30 rounded-lg flex items-center"
          >
            <X className="h-5 w-5 text-red-400 mr-3" />
            <span className="text-red-400">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage('')}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <nav className="p-6 border-r border-white/10">
              <div className="mb-8">
                <ProfileProgress
                  userSettings={userSettings}
                  onSectionClick={setActiveSection}
                />
              </div>
              <ul className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <motion.li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
                          ${
                            activeSection === section.id
                              ? 'bg-violet-600 text-white'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {section.title}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Main content */}
            <main className="p-6 md:col-span-3">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-light text-white">
                    {sections.find((s) => s.id === activeSection)?.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Manage your {activeSection} settings and preferences
                  </p>
                </div>

                <div className="mt-6">
                  {renderSectionContent()}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
