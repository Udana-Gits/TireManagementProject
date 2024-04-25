import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBpTNF3sail7NPF2pQxu2FrcYN1h7IEjhU",
  authDomain: "tiremngdtbase.firebaseapp.com",
  projectId: "tiremngdtbase",
  storageBucket: "tiremngdtbase.appspot.com",
  messagingSenderId: "65340283845",
  appId: "1:65340283845:web:7fcdc376f0ae656a5449ac",
  measurementId: "G-FKW2ZLPYN4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };