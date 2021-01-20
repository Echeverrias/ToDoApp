import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB9mRUdYNkDbKIjJyzNMFj5LIyCl4A3LW0",
  authDomain: "todo-d75b2.firebaseapp.com",
  databaseURL: "https://todo-d75b2-default-rtdb.firebaseio.com",
  projectId: "todo-d75b2",
  storageBucket: "todo-d75b2.appspot.com",
  messagingSenderId: "1995328174",
  appId: "1:1995328174:web:b1ca5c749d410de684bb3f",
  measurementId: "G-5SE86FMLQK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;