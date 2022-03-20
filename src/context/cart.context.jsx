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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

