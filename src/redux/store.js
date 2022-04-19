import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './root-reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];
if(process.env.NODE_ENV ==='development'){
    middleware.push(logger);
}

//TODO: change for configureStore from @reduxjs/toolkit
const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;