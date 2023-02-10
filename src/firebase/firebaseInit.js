import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGhp9si4SK3eAnJSPMWuJtP1-0-7xWLds",
  authDomain: "invoice-app-5d46c.firebaseapp.com",
  projectId: "invoice-app-5d46c",
  storageBucket: "invoice-app-5d46c.appspot.com",
  messagingSenderId: "763830202865",
  appId: "1:763830202865:web:868c6145eb0270e1ee1450",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
