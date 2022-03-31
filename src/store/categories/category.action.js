import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from './category.types';

//SYNCHRONOUS ACTION CREATOR FUNCTIONS
export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START); //set isLoading to true in reducer

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray); //send categoriesArray through as the payload

export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILURE, error); //send the error through as the payload

