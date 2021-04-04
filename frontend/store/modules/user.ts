import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { AsyncActionEnum, AsyncActionType } from '../../interfaces/reducer/action.interface';
import { InitialStateType } from '../../interfaces/reducer/state.interface';

export const initialState: InitialStateType = {
    loading: false,
    data: null,
    error: null,
};

const userReducer = createReducer<InitialStateType, AsyncActionType>(initialState, {
    [HYDRATE]: (state) => ({ ...state }),
    [AsyncActionEnum.API_LOADING]: (state) => ({ ...state, loading: true }),
    [AsyncActionEnum.API_SUCCESS]: (state, action) => ({ ...state, username: action.payload }),
    [AsyncActionEnum.API_FAILURE]: (state, action) => ({ ...state, error: action.payload }),
});

export default userReducer;
