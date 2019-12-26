import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import { Link } from 'react-router-dom';

interface PropsFromDispatch {
  userLogin: (email: string, password: string) => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
}

interface HeaderProps extends PropsFromDispatch, PropsFromState {

}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <p>
          {!isAuthenticated ? <Link to={'login'} >Login</Link> : <Link to={'user'}>User Profile</Link>}
        </p>
        <p>{isAuthenticated}</p>
        <p>
          <Link to={'/'} >Home</Link>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    isLoading: state.loading,
    error: state.error,
    isAuthenticated: Boolean(state.token),
  }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);