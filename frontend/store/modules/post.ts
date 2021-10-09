import { createReducer } from "typesafe-actions";
import { HYDRATE } from "next-redux-wrapper";

import asyncReqStatus from "../../utils/asyncReqStatus";
import { AsyncActionEnum, AsyncActionType } from "../../interfaces/reducer/action.interface";
import { PostStoreInterface } from "../../interfaces/reducer/state.interface";

export const initialState: PostStoreInterface = {
  singlePost: null,
  multiplePost: [],
  getSinglePostStatus: asyncReqStatus.initial(),
  getMultiplePostStatus: asyncReqStatus.initial(),
  deletePostStatus: asyncReqStatus.initial(),
};

const postReducer = createReducer<PostStoreInterface, AsyncActionType>(initialState, {
  [HYDRATE]: (state, action) => ({ ...state, ...action.payload.post }),
  // get single post
  [AsyncActionEnum.GET_SINGLE_POST_REQUEST]: (state) => ({
    ...state,
    getSinglePostStatus: asyncReqStatus.loading(),
  }),
  [AsyncActionEnum.GET_SINGLE_POST_SUCCESS]: (state, action) => ({
    ...state,
    singlePost: action.payload,
    getSinglePostStatus: asyncReqStatus.success(action.payload),
  }),
  [AsyncActionEnum.GET_SINGLE_POST_FAILURE]: (state, action) => ({
    ...state,
    getSinglePostStatus: asyncReqStatus.failure(action.payload),
  }),
  // get multiple post
  [AsyncActionEnum.GET_MULTIPLE_POST_REQUEST]: (state) => ({
    ...state,
    getMultiplePostStatus: asyncReqStatus.loading(),
  }),
  [AsyncActionEnum.GET_MULTIPLE_POST_SUCCESS]: (state, action) => ({
    ...state,
    multiplePost: action.payload,
    getMultiplePostStatus: asyncReqStatus.success(action.payload),
  }),
  [AsyncActionEnum.GET_MULTIPLE_POST_FAILURE]: (state, action) => ({
    ...state,
    getMultiplePostStatus: asyncReqStatus.failure(action.payload),
  }),
  // delete post
  [AsyncActionEnum.DELETE_POST_REQUEST]: (state) => ({
    ...state,
    getMultiplePostStatus: asyncReqStatus.loading(),
  }),
  [AsyncActionEnum.DELETE_POST_SUCCESS]: (state, action) => ({
    ...state,
  }),
  [AsyncActionEnum.DELETE_POST_FAILURE]: (state, action) => ({
    ...state,
  }),
});

export default postReducer;
