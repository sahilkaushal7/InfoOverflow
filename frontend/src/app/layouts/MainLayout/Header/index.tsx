import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import cn from 'classnames';
import { IOLink } from '../../../../lib/elements';
import { mainUrlsRoot, loginUrlsRoot, blogsUrlsRoot, userUrls } from '../../../urls';

interface PropsFromDispatch {
  userLogin: (email: string, password: string) => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  username: string;
  useremail: string;
  isLoading: boolean;
  userId: number;
}

interface HeaderProps extends PropsFromDispatch, PropsFromState {

}

interface HeaderState { }

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const { isAuthenticated, isLoading, userId } = this.props;
    const sharedProps = {
      activeClassName: 'io-ml__header-link--active',
      className: 'io-ml__header-link',
    };

    return (
      <div className={cn('io-ml__header-container')}>
        <p className={cn('io-clickable')}>
          <IOLink {...sharedProps} exact={true} to={mainUrlsRoot} >
            <i className={cn('fa', 'fa-home')} />
          </IOLink>
        </p>
        <p>{!isAuthenticated || isLoading ?
          <IOLink {...sharedProps} to={loginUrlsRoot}><i className={cn('fa', 'fa-sign-in')} /></IOLink> :
          <IOLink {...sharedProps} to={userUrls.profile(`${userId}`)}><i className={cn('fa', 'fa-user')} /></IOLink>}
        </p>
        <p>{isAuthenticated && 
          <IOLink {...sharedProps} to={blogsUrlsRoot}><i className={cn('fa', 'fa-rss')} /></IOLink>}
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
    userId: state.userId,
  }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
