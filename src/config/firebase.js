import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCjrwHQsRyde_meZnabgmme1qId3gXNbRc",
    authDomain: "review-company-2.firebaseapp.com",
    projectId: "review-company-2",
    storageBucket: "review-company-2.appspot.com",
    messagingSenderId: "668859537572",
    appId: "1:668859537572:web:66109b7ceb861bf3cc6e31"
});

export const auth = app.auth();
export const firestore = app.firestore();