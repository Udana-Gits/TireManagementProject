import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpTNF3sail7NPF2pQxu2FrcYN1h7IEjhU",
  authDomain: "tiremngdtbase.firebaseapp.com",
  projectId: "tiremngdtbase",
  storageBucket: "tiremngdtbase.appspot.com",
  messagingSenderId: "65340283845",
  appId: "1:65340283845:web:7fcdc376f0ae656a5449ac",
  measurementId: "G-FKW2ZLPYN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const messaging = getMessaging(app);

// Function to generate token
export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BNg2wRqSw0scoOQ4G8eakjulwKj1yn-ahUD6071aQaSkuA6zN5LhJY4QNswe__4gCEXE"
    });
    console.log(token);
  }
};

// Export the initialized Firebase services
export { app, auth, db };
