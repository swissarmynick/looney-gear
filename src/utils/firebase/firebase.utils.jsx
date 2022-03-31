
import { initializeApp } from "firebase/app";

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    collection, 
    doc, 
    getDoc, 
    getDocs,
    getFirestore,
    query, 
    setDoc,
    writeBatch 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJ9pmo6wUntsYfn9xH7PbNjO8L0kT9968",
  authDomain: "looney-gear-db.firebaseapp.com",
  projectId: "looney-gear-db",
  storageBucket: "looney-gear-db.appspot.com",
  messagingSenderId: "505818642967",
  appId: "1:505818642967:web:a85025966905995bd7ba52"
};

// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

// BATCH UPLOAD HELPER
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { //objectsToAdd is shop-data array
    const collectionRef = collection(db, collectionKey); //get ref of existing or non-existing collection
    
    const batch = writeBatch(db); //instatiate batch instance

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase()) //get ref of existing or non-existing doc within the collection
        batch.set(docRef, object); //stage write operations for each object in shop-data array (objectsToAdd)
    });

    await batch.commit(); //begin firing the write operations
    console.log('Batch Commit Complete');
}

// CATEGORIES
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q); 

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}

// USERS
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error creating new user', error.message)
        }
    }
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await  createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await  signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged( // We get back 'unsubscribe' from firebase onAuthStateChanged() 
            auth, // Still pass in auth.
            (userAuth) => { // Still supply a callback. We can use userAuth that is received from onAuthStateChanged()
                unsubscribe(); // It doesn't matter if we receive a user or not - just immediately unsubscribe
                resolve(userAuth); // Close the listener to avoid memory leak. Otherwise, listener would remain active.
            }, 
            reject // Third argument for onAuthStateChanged() is a callback for handling errors while fetching userAuth.
        ); 
    });
};