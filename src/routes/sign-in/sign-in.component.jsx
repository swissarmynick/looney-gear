import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"

const SignIn = () => {
    useEffect (async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef =  await createUserDocumentFromAuth(response.user); 
        }
    }, []); //empty array means run once when SignIn component is mounted.
    
    
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response, 'Response from firebase signInWithPopup(auth, provider) method.');
        const userDocRef =  await createUserDocumentFromAuth(response.user); //user object from response above is passed to firebase.utils to extrat UID
    }


    return ( 
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
     );
}
 
export default SignIn;