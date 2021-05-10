import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { AsyncActionEnum, AsyncActionType } from '../../interfaces/reducer/action.interface';
import { PostStoreType } from '../../interfaces/reducer/state.interface';

export const initialState: PostStoreType = {
    singlePost: null,
    posts: [],
    loading: false,
    error: null,
};

const postReducer = createReducer<PostStoreType, AsyncActionType>(initialState, {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.post }),
    [AsyncActionEnum.LOAD_POSTS_REQUEST]: (state) => ({ ...state, loading: true }),
    [AsyncActionEnum.LOAD_POSTS_SUCCESS]: (state, action) => ({
        ...state,
        posts: action.payload,
        loading: false,
    }),
    [AsyncActionEnum.LOAD_POSTS_FAILURE]: (state, action) => ({
        ...state,
        error: action.payload,
        loading: false,
    }),
    [AsyncActionEnum.LOAD_SINGLE_POST_REQUEST]: (state) => ({ ...state, loading: true }),
    [AsyncActionEnum.LOAD_SINGLE_POST_SUCCESS]: (state, action) => ({
        ...state,
        singlePost: action.payload,
        loading: false,
    }),
    [AsyncActionEnum.LOAD_SINGLE_POST_FAILURE]: (state, action) => ({
        ...state,
        error: action.payload,
        loading: false,
    }),
});

export default postReducer;
