import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    //find if productToAdd already exists in cartItems. Returns matched item.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //If yes - increment qty. If no - keep the item the same (will be all items other than productToAdd).
    if(existingCartItem) {
        return (
            cartItems.map((cartItem) => 
                cartItem.id === productToAdd.id 
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            )
        );
    }
    //If item doesn't already exist - return new array with existing cartItems plus the new product with qty 1.
    return [...cartItems, {...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //Find item in cart.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //If qty = 1 - remove item from cart. In other words, return an array of all items that don't match the id of existingCartItem to remove.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }

    //Return cartItems with cartItemToRemove qty decreased by 1.
    if(existingCartItem) {
        return (
            cartItems.map((cartItem) => 
                cartItem.id === cartItemToRemove.id ?
                    {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
            )
        );
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer.`);
    }
}

export const CartProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const { cartItems, cartCount, cartTotal, isCartOpen } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS, { 
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    cartTotal: newCartTotal,
                    }
            )
        );
    };
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
  
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    };

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal
    };


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

