import { createSelector } from "reselect";

//SLICE EXTRACTOR
//Extract cart 'slice' of root-reducer.js
//useSelector() calls provide redux state object.
const selectCartReducer = state => state.cart; 

//MEMOIZED SELECTORS
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

//LOGICAL SELECTORS for useSelector() calls.
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
)