import { all, call } from 'redux-saga/effects';

import { categoriesSagas } from './categories/category.saga';
import { userSagas } from './user/user.saga';

//GENERATOR FUNCTION - ES6
export function* rootSaga() {
    yield all([
        call(categoriesSagas),
        call(userSagas),
    ]);
}