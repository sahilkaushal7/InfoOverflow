import { EReduxActionTypes } from './actionTypes';
import { Endpoints } from '../../app/apis';
import { post } from '../../lib/utils/requests';

export const authStart = () => {
  return {
    type: EReduxActionTypes.AUTH_START,
  }
}

export const authSuccess = (token, email, name, id) => {
  return {
    type: EReduxActionTypes.AUTH_SUCCESS,
    token: token,
    username: name,
    useremail: email,
    userId: id,
  }
}

export const authFail = (error) => {
  return {
    type: EReduxActionTypes.AUTH_FAIL,
    error: error,
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: EReduxActionTypes.AUTH_LOGOUT,
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), expirationTime * 1000);
  }
}

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    post(Endpoints.LOGIN, {
      username: email,
      password: password,
    })
      .then(res => {
        const token = res.data.token;
        const email = res.data.email;
        const name = res.data.name;
        const id = res.data.id;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);
        localStorage.setItem('id', id);
        dispatch(authSuccess(token, email, name, id));
        checkAuthTimeout();
      })
      .catch(err => dispatch(authFail(err)))
  }
}

export const authSignUp = (name, email, password) => {
  return dispatch => {
    dispatch(authStart());
    post(Endpoints.USERS, {
      name: name,
      email: email,
      password: password,
    })
      .then(res => {
        alert(`Congrats ${res.data.name}. You have registered successfully, Please Login to continue.`)
      })
      .catch(err => dispatch(authFail(err)))
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    if (token === undefined) {
      dispatch(authLogout());
    }

    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, email, name, id));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
