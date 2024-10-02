const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, set, remove } = require('firebase/database');

// Replace with your Firebase project configuration
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
const db = getDatabase(app);

const convertDataFormat = async () => {
  try {
    const tireDataRef = ref(db, 'TireData');
    const snapshot = await get(tireDataRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const mmddyyyy in data) {
        const [month, day, year] = mmddyyyy.split('-');
        const ddmmyyyy = `${day}-${month}-${year}`;
        const dayData = data[mmddyyyy];

        await set(ref(db, `TireData/${ddmmyyyy}`), dayData);
        await remove(ref(db, `TireData/${mmddyyyy}`));
      }

      console.log('Data migration completed successfully.');
    } else {
      console.log('No data available to migrate.');
    }
  } catch (error) {
    console.error('Error migrating data:', error);
  }
};

convertDataFormat();
