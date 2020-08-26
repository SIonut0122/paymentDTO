import * as firebase from 'firebase/app';
import 'firebase/database';


 var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "test-fe-e5dfa.firebaseapp.com",
    databaseURL: "https://test-fe-e5dfa.firebaseio.com",
    projectId: "test-fe-e5dfa",
    storageBucket: "test-fe-e5dfa.appspot.com",
    messagingSenderId: "379688272486",
    appId: "1:379688272486:web:14d0fea130fdb31e97e3a7"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export {
   firebase as default
  }