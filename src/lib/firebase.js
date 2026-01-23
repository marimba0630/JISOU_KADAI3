import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APP_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

// Firebase 初期化
export const app = initializeApp(firebaseConfig);

// Analytics（本番のみ & 対応環境のみ）
export const initAnalytics = async () => {
  if (import.meta.env.PROD && await isSupported()) {
    getAnalytics(app);
  }
};