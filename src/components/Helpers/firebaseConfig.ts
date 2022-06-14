import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "forkify-app-3594a.firebaseapp.com",
  projectId: "forkify-app-3594a",
  storageBucket: "forkify-app-3594a.appspot.com",
  messagingSenderId: "329196450452",
  appId: "1:329196450452:web:41d103bc7e0b27c9883a81",
});
export const db = firebaseConfig.firestore();
