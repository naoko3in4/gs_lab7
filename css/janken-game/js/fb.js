const config = {
  apiKey: "AIzaSyC62DKfUR2MPA9l04janfme_yeBeIQ7ySo",
  authDomain: "janken-1bba8.firebaseapp.com",
  databaseURL: "https://janken-1bba8.firebaseio.com",
  projectId: "janken-1bba8",
  storageBucket: "janken-1bba8.appspot.com",
  messagingSenderId: "743698933015"
};
firebase.initializeApp(config);

const db = firebase.firestore();
