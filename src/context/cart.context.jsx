import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if productToAdd already exists in cartItems. Returns matched item.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //If yes - increment qty. 
    //If no - keep the item the same (will be all items other than productToAdd).
    if(existingCartItem) {
        return (
            cartItems.map((cartItem) => 
                cartItem.id === productToAdd.id ?
                    {...cartItem, quantity: cartItem.quantity + 1}
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

    //If qty = 1 - remove item from cart. 
    //In other words, return an array of all items that don't match the id of existingCartItem to remove.
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

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    //total is the accumulator. cartItem is the current element of the cartItems array. 
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
  
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

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

