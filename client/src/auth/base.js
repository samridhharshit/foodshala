import * as firebase from "firebase/app";
import "firebase/auth";
// require('dotenv').config()


// const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// });

const app = firebase.initializeApp ({
    apiKey: "AIzaSyC5fhW7ksJx6_t7P1nWtG94kQcWyEQHz90",
    authDomain: "foodshala-70013.firebaseapp.com",
    databaseURL: "https://foodshala-70013.firebaseio.com",
    projectId: "foodshala-70013",
    storageBucket: "foodshala-70013.appspot.com",
    messagingSenderId: "333161145808",
    appId: "1:333161145808:web:ad08a9544d6f99d0c085d5",
    measurementId: "G-JFBN56JGWF"
});

export default app;