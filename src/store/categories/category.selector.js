import { createSelector } from "reselect";

const selectCategoryReducer = (state) => { //I believe state is available because useSelector(selectCategoriesMap) is called within the component. Redux 'state' is the only argument for useSelector(). See category.component.jsx
    return state.categories;
}

export const selectCategories = createSelector(
    [selectCategoryReducer], //if nothing changed with selectCategoryReducer (categories) above, don't re-render.
    (categoriesSlice) => categoriesSlice.categories
    )

export const selectCategoriesMap = createSelector(
    [selectCategories], //if nothing changed with selectCategories above, don't re-render.
    (categories) => categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items; 
            return acc;
    }, {})
);