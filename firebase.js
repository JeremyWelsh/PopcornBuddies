// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9bDm5p7-Jd-bqydw-EXNvvvvSammGPXw",
  authDomain: "popcornbuddy-770f9.firebaseapp.com",
  projectId: "popcornbuddy-770f9",
  storageBucket: "popcornbuddy-770f9.appspot.com",
  messagingSenderId: "246029517450",
  appId: "1:246029517450:web:9a24cecd3dc3473b712373",
  measurementId: "G-QY59G492E2"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};