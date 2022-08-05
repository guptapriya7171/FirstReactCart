import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6arSaLSUFa6aOIfCeT9WIShBOJBToSNA",
  authDomain: "cart-326dc.firebaseapp.com",
  projectId: "cart-326dc",
  storageBucket: "cart-326dc.appspot.com",
  messagingSenderId: "257445464879",
  appId: "1:257445464879:web:e6a6cdb9175a462eda2fda"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

