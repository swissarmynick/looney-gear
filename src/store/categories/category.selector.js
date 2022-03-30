import { createSelector } from "reselect";

const selectCategoryReducer = (state) => { //The 'state' is available because useSelector(selectCategoriesMap) is called within category.component.jsx. Redux 'state' is the only argument for useSelector().
    return state.categories;
}

//MEMOIZED SELECTORS
export const selectCategories = createSelector(
    [selectCategoryReducer], //if nothing changed with selectCategoryReducer (categories) above, don't run. No re-render occurs because object returned from reducer is identical in memory.
    (categoriesSlice) => categoriesSlice.categories
    )

export const selectCategoriesMap = createSelector(
    [selectCategories], //if nothing changed with selectCategories above, don't run / re-render.
    (categories) => categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items; 
            return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);