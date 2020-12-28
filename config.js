import firebase from 'firebase'
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyB9q6e9KzEwVThT9NtMJW8Vl5lV50aGYuk",
  authDomain: "homework-388f2.firebaseapp.com",
  projectId: "homework-388f2",
  storageBucket: "homework-388f2.appspot.com",
  messagingSenderId: "15707795167",
  appId: "1:15707795167:web:664f975c4103615c8f036a",
  measurementId: "G-PP4X5M2BHC"
};
 firebase.initializeApp(firebaseConfig);
 export default firebase.firestore()