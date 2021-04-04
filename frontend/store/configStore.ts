import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(sagaMiddleware))
            : composeWithDevTools(applyMiddleware(logger, sagaMiddleware));
    const store = createStore(rootReducer, enhancer);

    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default createWrapper(configureStore, { debug: true });
