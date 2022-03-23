import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

//BATCH UPLOAD SHOP DATA - ONE TIME USE - Typically not ran on the front end.
// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
    categoriesMap: [{}],
});

export const CategoriesProvider = ({ children }) => {
    //BATCH UPLOAD SHOP DATA - ONE TIME USE - Typically not ran on the front end.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA); //categories is firestore collection name
    // }, [])

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => { //Don't define async function directly when calling useEffect(). 
        const getCategoriesMap = async () => { //Instead - create an anonomous async function within useEffect.
            const categoryMap = await getCategoriesAndDocuments(); //Initialize external firebase utils async function.
            console.log(categoryMap);
            
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap(); //Invoke internal async function after external async function is initialized.
    }, [])
    
    const value = {categoriesMap};
    
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}
