// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8NNv863nNr6zXKEpqw5hkSkRMhHUlBao",
  authDomain: "pantry-project-730b0.firebaseapp.com",
  projectId: "pantry-project-730b0",
  storageBucket: "pantry-project-730b0.appspot.com",
  messagingSenderId: "361820272023",
  appId: "1:361820272023:web:15048f090b40ef656b80d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}