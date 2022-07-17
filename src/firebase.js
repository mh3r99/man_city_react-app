import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

import { cityDb } from "./temp/m-city-export";

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

export const matchesCollection = collection(db, "matches");
export const playersCollection = collection(db, "players");
export const positionsCollection = collection(db, "positions");
export const promotionsCollection = collection(db, "promotions");
export const teamsCollection = collection(db, "teams");

// import data to firebase
// cityDb.matches.forEach((item) => {
//   setDoc(doc(matchesCollection), item);
// });

// cityDb.players.forEach((item) => {
//   setDoc(doc(playersCollection), item);
// });

// cityDb.positions.forEach((item) => {
//   setDoc(doc(positionsCollection), item);
// });

// cityDb.promotions.forEach((item) => {
//   setDoc(doc(promotionsCollection), item);
// });

// cityDb.teams.forEach((item) => {
//   setDoc(doc(teamsCollection), item);
// });
