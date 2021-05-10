import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import post from './modules/post';
import postSaga from './sagas/post';

const rootReducer = combineReducers({
    post,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([postSaga()]);
}

export default rootReducer;
