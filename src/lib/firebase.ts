import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";


const firebaseConfig = {
  apiKey: process.env.VITE_REACT_APP_APP_KEY,
  authDomain: process.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: process.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: process.env.VITE_REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.VITE_REACT_APP_APP_ID,
  measurementId: process.env.VITE_REACT_APP_MEASUREMENT_ID,
};

// Firebase 初期化
export const app = initializeApp(firebaseConfig);

// Analytics（本番のみ & 対応環境のみ）
export const initAnalytics = async () => {
  if (import.meta.env.PROD && await isSupported()) {
    getAnalytics(app);
  }
};