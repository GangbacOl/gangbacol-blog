import { takeLatest, put, call } from 'redux-saga/effects';

import { AsyncActionEnum, LoadSinglePostRequest } from '../../interfaces/reducer/action.interface';
import { Post } from '../../interfaces/reducer/state.interface';
import { getSinglePost, getPosts } from '../../utils/api';

export function* getSinglePostSaga(action: LoadSinglePostRequest) {
    try {
        const result: { post: Post } = yield call(getSinglePost, action.payload);
        yield put({ type: AsyncActionEnum.LOAD_SINGLE_POST_SUCCESS, payload: result.post });
    } catch (error) {
        yield put({ type: AsyncActionEnum.LOAD_SINGLE_POST_FAILURE, payload: error });
    }
}

export function* getPostsSaga() {
    try {
        const result: { posts: Post[] } = yield call(getPosts);
        yield put({ type: AsyncActionEnum.LOAD_POSTS_SUCCESS, payload: result.posts });
    } catch (error) {
        yield put({ type: AsyncActionEnum.LOAD_POSTS_FAILURE, payload: error });
    }
}

export default function* postSaga() {
    yield takeLatest(AsyncActionEnum.LOAD_SINGLE_POST_REQUEST, getSinglePostSaga);
    yield takeLatest(AsyncActionEnum.LOAD_POSTS_REQUEST, getPostsSaga);
}
