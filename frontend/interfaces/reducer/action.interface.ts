import { HYDRATE } from 'next-redux-wrapper';

export enum AsyncActionEnum {
    API_INIT = 'API_INIT',
    API_SUCCESS = 'API_SUCCESS',
    API_FAILURE = 'API_FAILURE',
    API_LOADING = 'API_LOADING',
}

export type AsyncActionType =
    | HydrateActionInterface
    | InitActionInterface
    | SuccessActionInterface
    | FailureActionInterface
    | LoadingActionInterface;

interface HydrateActionInterface {
    type: typeof HYDRATE;
    payload: ExamplePayload | null;
}
interface InitActionInterface {
    type: typeof AsyncActionEnum.API_INIT;
    payload: ExamplePayload | null;
}
interface SuccessActionInterface {
    type: typeof AsyncActionEnum.API_SUCCESS;
    payload: ExamplePayload | null;
}
interface FailureActionInterface {
    type: typeof AsyncActionEnum.API_FAILURE;
    payload: Error | null;
}
interface LoadingActionInterface {
    type: typeof AsyncActionEnum.API_LOADING;
    payload: ExamplePayload | null;
}

type ExamplePayload = {
    id: number;
    content: string;
};
