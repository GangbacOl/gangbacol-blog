import { createStore, compose, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';

import rootReducer, { rootSaga } from './index';

export interface SagaStore extends Store {
    sagaTask: Task;
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(sagaMiddleware))
            : composeWithDevTools(applyMiddleware(logger, sagaMiddleware));
    const store = createStore(rootReducer, enhancer);

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(configureStore, { debug: true });
