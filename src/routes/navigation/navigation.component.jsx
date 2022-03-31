
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { signOutStart } from "../../store/user/user.action";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from '../../store/user/user.selector';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { LogoContainer, NavigationContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart());

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