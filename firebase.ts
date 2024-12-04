import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Development Firebase configuration
const devFirebaseConfig = {
  apiKey: "AIzaSyDEVxwFMXmS6HcQmF2Zw_kRQHmKcKl8Hs4",
  authDomain: "malin-mental-health-dev.firebaseapp.com",
  projectId: "malin-mental-health-dev",
  storageBucket: "malin-mental-health-dev.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
const app = initializeApp(import.meta.env.VITE_FIREBASE_API_KEY ? firebaseConfig : devFirebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
