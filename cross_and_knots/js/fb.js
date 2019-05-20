'use strict';

const firebaseConfig = {
  apiKey: "AIzaSyAAvulz6O9jotHhotuHD_mRb5tlhqUSJ6A",
  authDomain: "cross-and-knots.firebaseapp.com",
  databaseURL: "https://cross-and-knots.firebaseio.com",
  projectId: "cross-and-knots",
  storageBucket: "cross-and-knots.appspot.com",
  messagingSenderId: "25917820963",
  appId: "1:25917820963:web:92bcb09bb3553609"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
