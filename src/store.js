import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const persistConfig = {
    key: "root@key1ss",

    storage: AsyncStorage,

    whitelist: [
        'auth',
    ],
    blacklist: [

    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const logger = createLogger();

const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware, logger),
)

let persistor = persistStore(store);

export {
    store,
    persistor
}