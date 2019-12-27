import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import cn from 'classnames';
import { IOLink } from '../../../../lib/elements';

interface PropsFromDispatch {
  userLogin: (email: string, password: string) => void;
  logout: () => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  username: string;
  useremail: string;
  isLoading: boolean;
}

interface HeaderProps extends PropsFromDispatch, PropsFromState {

}

interface HeaderState { }

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const { isAuthenticated, logout, username, useremail, isLoading } = this.props;
    return (
      <div className={cn('io-ml__header-container')}>
        {!isAuthenticated && !isLoading ?
          <IOLink to={'login'}>Login</IOLink> :
          <IOLink to={'user'}>{username}</IOLink>}
        {isAuthenticated && <IOLink to={'/'} onClick={logout}>Logout</IOLink>}
        <p className={cn('io-clickable')}>
          <IOLink to={'/'} >Home</IOLink>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    isLoading: state.loading,
    error: state.error,
    username: state.username,
    useremail: state.useremail,
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password))),
    logout: () => dispatch(actions.authLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);