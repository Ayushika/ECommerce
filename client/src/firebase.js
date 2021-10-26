import firebase from "firebase/app";
import "firebase/auth";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDqLJWLiO3ls1CW0h_xSyllHVLhPX7T4AM",
  authDomain: "e-commerce-d7669.firebaseapp.com",
  projectId: "e-commerce-d7669",
  storageBucket: "e-commerce-d7669.appspot.com",
  messagingSenderId: "868835032133",
  appId: "1:868835032133:web:c23e54f986eb5f4e4b772c",
};

//initialize firebase app
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
