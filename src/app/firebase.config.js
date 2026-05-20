import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlUpoOnm-Rrc1kofKRmtt2oY1hkoJEv08",
  authDomain: "docappoint-9378b.firebaseapp.com",
  projectId: "docappoint-9378b",
  storageBucket: "docappoint-9378b.firebasestorage.app",
  messagingSenderId: "382358994986",
  appId: "1:382358994986:web:a4c955d37b48c6e1a28353",
  measurementId: "G-1Y7YTXN4RY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth এক্সপোর্ট করা হচ্ছে যেন অন্য ফাইলে ব্যবহার করা যায়
export const auth = getAuth(app);