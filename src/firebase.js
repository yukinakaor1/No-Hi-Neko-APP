import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyB6hijTwtcKH8jUEvF5TT-E2m6_rsuimFw",
    authDomain: "neko-no-hi.firebaseapp.com",
    databaseURL: "https://neko-no-hi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "neko-no-hi",
    storageBucket: "neko-no-hi.firebasestorage.app",
    messagingSenderId: "634363300057",
    appId: "1:634363300057:web:76d75df054fc93171f16c8",
    measurementId: "G-RKS18RBR87"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);
