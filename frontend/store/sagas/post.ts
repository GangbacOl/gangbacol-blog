import { DeletePostRequest } from "../../interfaces/reducer/action.interface";
import { takeLatest, put, call } from "redux-saga/effects";

import { AsyncActionEnum, GetSinglePostRequest } from "../../interfaces/reducer/action.interface";
import { Post } from "../../interfaces/reducer/state.interface";
import { getSinglePost, getPosts, deletePost } from "../../apis/post";

export function* getSinglePostSaga(action: GetSinglePostRequest) {
  try {
    const result: { post: Post } = yield call(getSinglePost, action.payload);
    yield put({ type: AsyncActionEnum.GET_SINGLE_POST_SUCCESS, payload: result.post });
  } catch (error) {
    yield put({ type: AsyncActionEnum.GET_SINGLE_POST_FAILURE, payload: error });
  }
}

export function* getPostsSaga() {
  try {
    const result: { posts: Post[] } = yield call(getPosts);
    yield put({ type: AsyncActionEnum.GET_MULTIPLE_POST_SUCCESS, payload: result.posts });
  } catch (error) {
    yield put({ type: AsyncActionEnum.GET_MULTIPLE_POST_FAILURE, payload: error });
  }
}

// delete post 로직 작성중...
export function* deletePostSaga(action: DeletePostRequest) {
  try {
    yield call(deletePost, action.payload);
    yield put({ type: AsyncActionEnum.DELETE_POST_SUCCESS });
  } catch (error) {}
}

export default function* postSaga() {
  yield takeLatest(AsyncActionEnum.GET_SINGLE_POST_REQUEST, getSinglePostSaga);
  yield takeLatest(AsyncActionEnum.GET_MULTIPLE_POST_REQUEST, getPostsSaga);
  yield takeLatest(AsyncActionEnum.DELETE_POST_REQUEST, deletePostSaga);
}
