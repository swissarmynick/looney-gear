import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]); // Yihua says: "special Map object" is passed the buttonType to compare to the keys and return the correct button component. Right?

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading 
                ? <ButtonSpinner /> 
                : children}
        </CustomButton>
    );
};
 
export default Button;