import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  User,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import ReminderService from '../services/ReminderService';

interface UserSettings {
  fullName: string;
  bio: string;
  darkMode: boolean;
  language: string;
  timezone: string;
  dataSharing: boolean;
  activityVisible: boolean;
  dateFormat: string;
  theme: string;
  fontSize: number;
  notifications: {
    weeklyProgress: boolean;
    communityUpdates: boolean;
    newResources: boolean;
    sessionReminders: boolean;
    tipsAndRecommendations: boolean;
  };
}

interface AuthContextType {
  currentUser: User | null;
  userSettings: UserSettings | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (oobCode: string, newPassword: string) => Promise<void>;
}

const defaultSettings: UserSettings = {
  fullName: '',
  bio: '',
  darkMode: false,
  language: 'en',
  timezone: 'UTC',
  dataSharing: true,
  activityVisible: true,
  dateFormat: 'mdy',
  theme: 'Default',
  fontSize: 16,
  notifications: {
    weeklyProgress: true,
    communityUpdates: true,
    newResources: true,
    sessionReminders: true,
    tipsAndRecommendations: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  async function getUserSettings(uid: string) {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserSettings;
      } else {
        // Create default settings for new users
        const newSettings = { ...defaultSettings };
        await setDoc(userDocRef, {
          ...newSettings,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return newSettings;
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return defaultSettings;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const settings = await getUserSettings(user.uid);
        setUserSettings(settings);
        // Initialize reminder service
        ReminderService.getInstance().startReminderService(user.uid);
      } else {
        setUserSettings(null);
        // Stop reminder service
        ReminderService.getInstance().stopReminderService();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document with default settings
    await setDoc(doc(db, 'users', user.uid), {
      ...defaultSettings,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async function updateUserSettings(newSettings: Partial<UserSettings>) {
    if (!currentUser) throw new Error('No authenticated user');

    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, {
      ...newSettings,
      updatedAt: serverTimestamp(),
    });

    // Update local state
    setUserSettings(prev => prev ? { ...prev, ...newSettings } : null);
  }

  async function updateUserPassword(newPassword: string) {
    if (!currentUser) throw new Error('No authenticated user');
    await updatePassword(currentUser, newPassword);
  }

  const value = {
    currentUser,
    userSettings,
    loading,
    login: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
    signup,
    logout: () => signOut(auth),
    signInWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await getUserSettings(result.user.uid);
      }
    },
    signInWithGithub: async () => {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await getUserSettings(result.user.uid);
      }
    },
    updateUserPassword,
    updateUserSettings,
    resetPassword: (email: string) => sendPasswordResetEmail(auth, email),
    confirmPasswordReset: (oobCode: string, newPassword: string) => 
      confirmPasswordReset(auth, oobCode, newPassword),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
