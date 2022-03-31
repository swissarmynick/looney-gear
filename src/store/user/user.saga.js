import { all, call, put, takeLatest } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';
import { 
    signInSuccess, signInFailure, 
    signUpSuccess, signUpFailure, 
    signOutSuccess, signOutFailure, 
} from './user.action';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, 
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser, 
} from '../../utils/firebase/firebase.utils';

// CREATE-GET USER SNAPSHOT
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
};

// SIGN IN - GENERATORS
export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return; 
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithEmail(action) {
    const { email, password } = action.payload;
    
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);

    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);

    } catch (error) {
        yield put(signInFailure(error));
    }
};

// SIGN UP - GENERATORS
export function* signUp(action) {
    const { email, password, displayName } = action.payload;

    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));

    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp(action) {
    const { user, additionalDetails } = action.payload;
    try {
        yield call(getSnapshotFromUserAuth, user, additionalDetails);

    } catch (error) {
        yield put(signUpFailure(error));
    }
}

// SIGN OUT - GENERATORS
export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());

    } catch (error) {
        yield put(signOutFailure(error));
    }
}

// SIGN IN - ENTRY POINTS
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

// SIGN UP - ENTRY POINTS
export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// SIGN OUT - ENTRY POINTS
export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// SAGA AGGREGATOR
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onEmailSignInStart),
        call(onGoogleSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
};