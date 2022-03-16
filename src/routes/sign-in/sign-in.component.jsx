import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response, 'Response from firebase signInWithPopup(auth, provider) method.');
        const userDocRef =  await createUserDocumentFromAuth(response.user); //user object from response above is passed to firebase.utils to extrat UID
    }

    return ( 
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
     );
}
 
export default SignIn;