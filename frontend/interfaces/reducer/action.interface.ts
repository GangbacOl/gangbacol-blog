import { HYDRATE } from 'next-redux-wrapper';
import { END } from 'redux-saga';

import { Post, PostStoreType } from './state.interface';

export enum AsyncActionEnum {
    LOAD_POSTS_INIT = 'LOAD_POSTS_INIT',
    LOAD_SINGLE_POST_SUCCESS = 'LOAD_SINGLE_POST_SUCCESS',
    LOAD_SINGLE_POST_FAILURE = 'LOAD_SINGLE_POST_FAILURE',
    LOAD_SINGLE_POST_REQUEST = 'LOAD_SINGLE_POST_REQUEST',
    LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS',
    LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE',
    LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST',
}

export type AsyncActionType =
    | END
    | Hydrate
    | LoadPostsRequest
    | LoadPostsSuccess
    | LoadPostsFailure
    | LoadSinglePostRequest
    | LoadSinglePostSucces
    | LoadSinglePostFail;

export interface Hydrate {
    type: typeof HYDRATE;
    payload: { post: PostStoreType };
}
export interface LoadPostsRequest {
    type: typeof AsyncActionEnum.LOAD_POSTS_REQUEST;
}
export interface LoadPostsSuccess {
    type: typeof AsyncActionEnum.LOAD_POSTS_SUCCESS;
    payload: Post[];
}
export interface LoadPostsFailure {
    type: typeof AsyncActionEnum.LOAD_POSTS_FAILURE;
    payload: Error | null;
}
export interface LoadSinglePostRequest {
    type: typeof AsyncActionEnum.LOAD_SINGLE_POST_REQUEST;
    payload: string | string[];
}
export interface LoadSinglePostSucces {
    type: typeof AsyncActionEnum.LOAD_SINGLE_POST_SUCCESS;
    payload: Post;
}
export interface LoadSinglePostFail {
    type: typeof AsyncActionEnum.LOAD_SINGLE_POST_FAILURE;
    payload: Error | null;
}
