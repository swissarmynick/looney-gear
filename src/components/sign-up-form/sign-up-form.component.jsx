import { useState } from "react";
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../store/user/user.action.js';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use.');
            }
            console.log("Error creating user.", error)
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]: value });
    }
    
    return ( 
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up Now!</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />
                
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <Button type="submit">Sign Up</Button>
                
            </form>
        </div>
     );
}
 
export default SignUpForm;