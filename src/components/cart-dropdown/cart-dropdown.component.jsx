import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return ( 
       <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length
                    ? cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                    : <span className='empty-message'>Your cart is empty. Shop harder!</span>
                }
            </div>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
       </div> 
     );
}
 
export default CartDropdown;