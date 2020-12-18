import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDQt__olAzlmRJ7DP-JKkIcOcX0Dhdrzpk",
  authDomain: "smoothies-df8e2.firebaseapp.com",
  projectId: "smoothies-df8e2",
  storageBucket: "smoothies-df8e2.appspot.com",
  messagingSenderId: "974495682546",
  appId: "1:974495682546:web:ef4191b48e713d91abe56b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
