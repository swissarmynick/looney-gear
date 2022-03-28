import { compose, createStore, applyMiddleware} from 'redux';
import { persistReducer, persistStore } from  'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';

// import { loggerMiddleware } from './middleware/logger';
// const middleWares = [loggerMiddleware];

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//Don't log while in production. Also filter out 'false' value generated when in production.
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean); 

//Use Redux DevTools chrome extension when it's available and we're not in production. Otherwise use compose directly from redux.
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));//now using composedEnhancer instead of compose.

export const store = createStore(persistedReducer, undefined, composedEnhancers); //now using persistedReducer instead of rootReducer.

export const persistor = persistStore(store);
