import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB0DJ6WKIcvdh5Su1KIFxdUKAUJ8TvubWU",
  authDomain: "gaming-application-dba5c.firebaseapp.com",
  databaseURL: "https://gaming-application-dba5c.firebaseio.com",
  projectId: "gaming-application-dba5c",
  storageBucket: "",
  messagingSenderId: "63237393870",
  appId: "1:63237393870:web:038b9759c580d228382f9f"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
