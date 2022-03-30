import { compose, createStore, applyMiddleware} from 'redux';
import { persistReducer, persistStore } from  'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import { loggerMiddleware } from './middleware/logger';
// const middleWares = [loggerMiddleware];

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['user'],
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Don't log while in production. Also filter out 'false' value generated when in production.
// The thunk middleware looks for any functions that were passed to `store.dispatch`. e.g. shop.component.jsx  - dispatch(fetchCategoriesAsync())
// If this "action" is really a function, call it and return the result. 
// Inject the store's `dispatch` and `getState` methods, as well as any "extra arg". 
// Otherwise, pass the action down the middleware chain as usual.
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean); 

//Use Redux DevTools chrome extension when it's available and we're not in production. Otherwise use compose directly from redux.
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));//now using composedEnhancer instead of compose.
console.log(...middleWares)

export const store = createStore(persistedReducer, undefined, composedEnhancers); //now using persistedReducer instead of rootReducer.

export const persistor = persistStore(store);
