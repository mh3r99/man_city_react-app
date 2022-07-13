import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8ACrDynoUcoGCOdBVM8FwKBZkp6xGnwY",
  authDomain: "man-city-react-app99.firebaseapp.com",
  projectId: "man-city-react-app99",
  storageBucket: "man-city-react-app99.appspot.com",
  messagingSenderId: "417175114366",
  appId: "1:417175114366:web:81a3d72fcc9edcdafe7e2f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
