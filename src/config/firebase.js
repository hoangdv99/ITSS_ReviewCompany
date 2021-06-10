import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAqcxQEQxDzcKEjYzhP5F2BWyPayQoWk4M",
    authDomain: "review-company-efbb5.firebaseapp.com",
    projectId: "review-company-efbb5",
    storageBucket: "review-company-efbb5.appspot.com",
    messagingSenderId: "480344273330",
    appId: "1:480344273330:web:5a204620257f7da004f4ab"
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();