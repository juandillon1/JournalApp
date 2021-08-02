import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDY6Tk6HfGl3QjTT3qQaTssyPYFlxJGon0",
  authDomain: "react-app-curso-39926.firebaseapp.com",
  projectId: "react-app-curso-39926",
  storageBucket: "react-app-curso-39926.appspot.com",
  messagingSenderId: "174459211723",
  appId: "1:174459211723:web:8bf41332f5d261b2c9304e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}