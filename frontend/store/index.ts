import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import user from './modules/user';
import userSaga from './sagas/user';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([userSaga()]);
}
