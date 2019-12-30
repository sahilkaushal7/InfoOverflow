import { EReduxActionTypes } from './actions/actionTypes';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export interface Error {
  message: string;
}
export interface State {
  error: Error | null;
  loading: boolean;
  token: string | null;
  username: string;
  useremail: string;
  userId: number;
}

export const Actions = Object.assign(
  EReduxActionTypes
)

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;
export type Actions = ActionUnion<typeof Actions>

export type DispatchType = ThunkDispatch<State, {}, Actions> & Dispatch<Actions>;