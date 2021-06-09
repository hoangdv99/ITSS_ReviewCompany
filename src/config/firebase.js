import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';

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

//loicd - get all companies
export const getCompanies = async () => {
    try{
        const model = await firestore
            .collection("companies")
            .get();
        const results = model.docs.map(
            (doc) => ({...doc.data(), id: doc.id})
        );
        return results;
    }catch (err){
        console.log(err);
        return [];
    }
}

// loicd - add new company
export const addCompany = async (item) => {
    try {
        const model = firestore.collection("companies");        
        await model.add(item);
    }catch (err) {
        console.log(err);
    }
}

//loicd - upload image
export const uploadImage = async (image) => {
    const ref = storage.ref().child(`/images/logos/${image.name}`);
    let downloadUrl = "";
    try {
      await ref.put(image);
      downloadUrl = await ref.getDownloadURL();
    } catch (err) {
      console.log(err);
    }
    return downloadUrl;
}