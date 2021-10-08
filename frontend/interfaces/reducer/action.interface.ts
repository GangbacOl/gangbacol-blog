import { HYDRATE } from "next-redux-wrapper";
import { END } from "redux-saga";

import { Post, PostStoreType } from "./state.interface";

export enum AsyncActionEnum {
  GET_MULTIPLE_POST_INIT = "GET_MULTIPLE_POST_INIT",
  GET_SINGLE_POST_SUCCESS = "GET_SINGLE_POST_SUCCESS",
  GET_SINGLE_POST_FAILURE = "GET_SINGLE_POST_FAILURE",
  GET_SINGLE_POST_REQUEST = "GET_SINGLE_POST_REQUEST",
  GET_MULTIPLE_POST_SUCCESS = "GET_MULTIPLE_POST_SUCCESS",
  GET_MULTIPLE_POST_FAILURE = "GET_MULTIPLE_POST_FAILURE",
  GET_MULTIPLE_POST_REQUEST = "GET_MULTIPLE_POST_REQUEST",
  DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS",
  DELETE_POST_FAILURE = "DELETE_POST_FAILURE",
  DELETE_POST_REQUEST = "DELETE_POST_REQUEST",
}

export type AsyncActionType =
  | END
  | Hydrate
  | GetMultiplePostRequest
  | GetMultiplePostSuccess
  | GetMultiplePostFailure
  | GetSinglePostRequest
  | GetSinglePostSuccess
  | GetSinglePostFailure
  | DeletePostRequest
  | DeletePostSuccess
  | DeletePostFailure;

export interface Hydrate {
  type: typeof HYDRATE;
  payload: { post: PostStoreType };
}
export interface GetMultiplePostRequest {
  type: typeof AsyncActionEnum.GET_MULTIPLE_POST_REQUEST;
}
export interface GetMultiplePostSuccess {
  type: typeof AsyncActionEnum.GET_MULTIPLE_POST_SUCCESS;
  payload: Post[];
}
export interface GetMultiplePostFailure {
  type: typeof AsyncActionEnum.GET_MULTIPLE_POST_FAILURE;
  payload: Error;
}
export interface GetSinglePostRequest {
  type: typeof AsyncActionEnum.GET_SINGLE_POST_REQUEST;
  payload: string | string[];
}
export interface GetSinglePostSuccess {
  type: typeof AsyncActionEnum.GET_SINGLE_POST_SUCCESS;
  payload: Post;
}
export interface GetSinglePostFailure {
  type: typeof AsyncActionEnum.GET_SINGLE_POST_FAILURE;
  payload: Error;
}
export interface DeletePostRequest {
  type: typeof AsyncActionEnum.DELETE_POST_REQUEST;
  payload: string | string[];
}
export interface DeletePostSuccess {
  type: typeof AsyncActionEnum.DELETE_POST_SUCCESS;
  payload: Post;
}
export interface DeletePostFailure {
  type: typeof AsyncActionEnum.DELETE_POST_FAILURE;
  payload: Error | null;
}
