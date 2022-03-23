
import { useContext } from 'react';
import { Outlet } from "react-router-dom";

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { LogoContainer, NavigationContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className="logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>SHOP</NavLink>
                {currentUser 
                    ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)  
                    : (<NavLink to='/auth'>SIGN IN</NavLink>)
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </>
    )
  }

  export default Navigation;