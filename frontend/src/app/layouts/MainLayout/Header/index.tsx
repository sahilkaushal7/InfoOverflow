import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State } from '../../../../store/types';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface HeaderProps {
  userLogin: (email: string, password: string) => void;
}

class Header extends React.Component<HeaderProps> {
  loginSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    this.props.userLogin(email, password);
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.loginSubmit(e)} >
        <p>Please fill in the login details</p>
        <label><b>email : </b></label>
        <input type={'text'} name={'email'} />
        <label><b>Password : </b></label>
        <input type={'password'} name={'password'} />
        <input type={'submit'} name={'Login'} />
        <br />
      </form>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    isLoading: state.loading,
    error: state.error
  }
}

type dipatchAuthLogin = ThunkDispatch<State, {}, any> & Dispatch<any>;

const mapDispatchToProps = (dispatch: dipatchAuthLogin) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);