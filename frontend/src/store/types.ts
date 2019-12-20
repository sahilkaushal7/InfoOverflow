import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT } from './actions/actionTypes';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export interface State {
  error: string;
  loading: boolean;
  token: string;
  username: string;
  useremail: string;
}

export const Actions = Object.assign(
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
)

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;
export type Actions = ActionUnion<typeof Actions>

export type DispatchType = ThunkDispatch<State, {}, Actions> & Dispatch<Actions>;