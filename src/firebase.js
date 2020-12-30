import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAsgCjFk9iqVkvTC68C5Pi5XenJH6STyUg",
  authDomain: "whatsapp-mern-74ed6.firebaseapp.com",
  projectId: "whatsapp-mern-74ed6",
  storageBucket: "whatsapp-mern-74ed6.appspot.com",
  messagingSenderId: "912447569175",
  appId: "1:912447569175:web:82f4c7e3c4bbc3e1100b52"
};

// initialize app with firbase 
const firebaseApp = firebase.initializeApp(firebaseConfig);

// connect app to firestore  

const db = firebaseApp.firestore();

// using firebase for auth 
const auth = firebase.auth();

// using google for firebase authentication 
const provider = new firebase.auth.GoogleAuthProvider();

// explicit export bcuz not used a lot 
export { auth, provider };

// implicitly exporting bcuz used more
export default db;