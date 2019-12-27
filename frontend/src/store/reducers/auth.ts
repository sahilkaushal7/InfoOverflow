import { EReduxActionTypes, TUserReducerActions, IReduxAuthStartAction, IReduxAuthSuccessAction, IReduxAuthFailAction, IReduxAuthLogoutAction } from '../actions/actionTypes';
import updatedObject from '../utility'
import { State } from '../types';

const initialState = {
  error: null,
  loading: false,
  token: null,
  useremail: '',
  username: ''
}

const authStart = (state: State, action: IReduxAuthStartAction) => {
  return updatedObject(state, {
    error: null,
    loading: true,
  })
}

const authSuccess = (state: State, action: IReduxAuthSuccessAction) => {
  return updatedObject(state, {
    error: null,
    loading: false,
    token: action.token,
    username: action.username,
    useremail: action.useremail
  })
}

const authFail = (state: State, action: IReduxAuthFailAction) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  })
}

const authLogout = (state: State, action: IReduxAuthLogoutAction) => {
  return updatedObject(state, {
    token: null,
  })
}

const reducer = ( state = initialState, action: TUserReducerActions ) => {
  switch(action.type) {
    case EReduxActionTypes.AUTH_START: return authStart(state, action); 
    case EReduxActionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case EReduxActionTypes.AUTH_FAIL: return authFail(state, action);
    case EReduxActionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
}

export default reducer;