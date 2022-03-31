import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.action';
import { CATEGORIES_ACTION_TYPE } from './category.types';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

//SAGAS - GENERATOR FUNCTIONS
export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments); // Don't move on until async call is complete.
        yield put(fetchCategoriesSuccess(categoriesArray)); //'put' is the generator function version of dispatch()

    } catch (error) {
        yield put(fetchCategoriesFailure(error))
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync) //When latest start action is received, fetch categories above.
}

//CATEGORY SAGA AGGREGATOR
export function* categoriesSagas() {
    yield all([call(onFetchCategories)]) // Only complete when everything above is done.
}