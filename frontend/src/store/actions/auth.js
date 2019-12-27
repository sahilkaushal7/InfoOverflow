import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, email, name) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: name,
    useremail: email
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
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
    axios.post('http://192.168.99.100:8000/apis/login/', {
      username: email,
      password: password,
    })
      .then(res => {
        const token = res.data.token;
        const email = res.data.email;
        const name = res.data.username;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('email', email);
        localStorage.setItem('name', name);
        dispatch(authSuccess(token, email, name));
        checkAuthTimeout();
      })
      .catch(err => dispatch(authFail(err)))
  }
}

export const authSignUp = (name, email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://192.168.99.100:8000/apis/users/', {
      name: name,
      email: email,
      password: password,
    })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        checkAuthTimeout(3600);
      })
      .catch(err => dispatch(authFail(err)))
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    if (token === undefined) {
      dispatch(authLogout());
    }

    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, email, name));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}