// export const AUTH_START = 'AUTH_START';
// export const AUTH_SUCCESS = 'AUTH_SUCCESS';
// export const AUTH_FAIL = 'AUTH_FAIL';
// export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export enum EReduxActionTypes {
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAIL = 'AUTH_FAIL',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
};

export interface IReduxBaseAction {
  type: EReduxActionTypes;
}

export interface IReduxAuthStartAction extends IReduxBaseAction {
  type: EReduxActionTypes.AUTH_START;
}

export interface IReduxAuthSuccessAction extends IReduxBaseAction {
  type: EReduxActionTypes.AUTH_SUCCESS;
  token: string;
  username: string;
  useremail: string;
}

export interface IReduxAuthFailAction extends IReduxBaseAction {
  type: EReduxActionTypes.AUTH_FAIL;
  error: string;
}

export interface IReduxAuthLogoutAction extends IReduxBaseAction {
  type: EReduxActionTypes.AUTH_LOGOUT;
}

export type TUserReducerActions = IReduxAuthStartAction | IReduxAuthSuccessAction | IReduxAuthFailAction | IReduxAuthLogoutAction;
