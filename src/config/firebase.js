import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBXOnQsnlKAt0XmofKr4ei8NttcP2BTqcg",
    authDomain: "review-company3.firebaseapp.com",
    projectId: "review-company3",
    storageBucket: "review-company3.appspot.com",
    messagingSenderId: "1019049461189",
    appId: "1:1019049461189:web:22347c8cbe0506f8a3b7ac"
});

export const auth = app.auth();
export const firestore = app.firestore();

export const createNewUser = async ({ name, email, pass }) => {
  try {
    auth.createUserWithEmailAndPassword(email, pass).then((userCredential) => {
      firestore
        .collection("users")
        .doc(userCredential.uid)
        .set({ uid: userCredential.uid, name: name, email: email });
    });
  } catch (error) {
    console.log(error);
  }
};
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

//loicd - update company
export const updateCompany = async(item) =>{
    try{
        const model = firestore.collection("companies").doc(item.id);
        await model.update(item);
    } catch (err){
        console.log(err); 
    }
}

//loicd - remove company
export const removeCompany = async (item) => {
    const model = firestore.collection("companies");
    try {
       const company = model.doc(item.id);
       await company.delete();
    } catch (err){
        console.log(err);
    }
}

//loicd - validation for company
export const validateAddCompany = async (name, site) => {
    const all = firestore.collection("companies").get();
    let ck = false;
    try{
        (await all).forEach((item)=>{
            if(name === item.data().name && site === item.data().site){
                ck = true;
            }
        })
    } catch (err) {
        console.log(err);
    }
    return ck;
}
