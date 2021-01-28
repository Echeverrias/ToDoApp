import firebase from 'firebase';


console.log(process.env.REACT_APP_FIREBASE_CONFIG);
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;