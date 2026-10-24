import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCZH2aUbxKEDfCnmHB80MHf1oYZnbRFomo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sistemaspex-ae1b9.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sistemaspex-ae1b9',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sistemaspex-ae1b9.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '101083926133',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:101083926133:web:5ab7d8d000818d44cbf23c',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-7KR5HQ8QMD',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export default app;
