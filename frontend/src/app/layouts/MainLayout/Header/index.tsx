import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userLogin: (email: string, password: string) => void;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div>
        <p>
          <Link to={'login'} >Login</Link>
        </p>
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
    error: state.error
  }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);