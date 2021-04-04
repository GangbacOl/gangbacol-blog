import { takeEvery, put, call } from 'redux-saga/effects';

import { AsyncActionEnum } from '../../interfaces/reducer/action.interface';
import { getUser } from '../../utils/api';

function* getUserSaga(action: any) {
    try {
        console.log(action);
        const result = yield call(getUser, action.payload);
        yield put({ type: AsyncActionEnum.API_SUCCESS, payload: result.data.history });
    } catch (error) {
        yield put({ type: AsyncActionEnum.API_FAILURE, payload: error });
    }
}

export default function* userSaga() {
    yield takeEvery(AsyncActionEnum.API_LOADING, getUserSaga);
}
