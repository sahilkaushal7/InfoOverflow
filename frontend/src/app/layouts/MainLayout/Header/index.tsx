import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import cn from 'classnames';
import { IOLink } from '../../../../lib/elements';

interface PropsFromDispatch {
  userLogin: (email: string, password: string) => void;
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
    const { isAuthenticated, isLoading } = this.props;
    const sharedProps = {
      activeClassName: 'io-ml__header-link--active',
      className: 'io-ml__header-link',
    };

    return (
      <div className={cn('io-ml__header-container')}>
        <p className={cn('io-clickable')}>
          <IOLink {...sharedProps} exact={true} to={'/'} >
            <i className={cn('fa', 'fa-home')} />
          </IOLink>
        </p>
        <p>{!isAuthenticated || isLoading ?
          <IOLink {...sharedProps} to={'login'}><i className={cn('fa', 'fa-user-plus')} /></IOLink> :
          <IOLink {...sharedProps} to={'user'}><i className={cn('fa', 'fa-user')} /></IOLink>}
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

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);