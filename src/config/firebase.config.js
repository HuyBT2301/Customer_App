import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDdt7tznN8sJlEJXckyI7OghGkQVJxaxmc",
  authDomain: "[deliveryapp].firebaseapp.com",
  projectId: "deliveryapp-67cf7",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 