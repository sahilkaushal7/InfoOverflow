import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import { State, DispatchType } from '../../../../store/types';
import cn from 'classnames';
import { IOLink } from '../../../../lib/elements';
import { mainUrlsRoot, loginUrlsRoot, blogsUrlsRoot, userUrls } from '../../../urls';
import ReactToolTip from 'react-tooltip';

enum ToolTipIDs {
  'SIGNIN' = 'Login',
  'SIGNUP' = 'Register',
  'HOME' = 'Home',
  'BLOGS' = 'Blogs',
  'PROFILE' = 'Profile',
}

interface ToolTipProps {
  id: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ id }) => (
  <ReactToolTip
    delayShow={500}
    place="right"
    type="info"
    effect="solid"
    className={cn('io-icontip')}
    id={id}
  />
)

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
    const { isAuthenticated, isLoading, userId, useremail } = this.props;
    const sharedProps = {
      activeClassName: 'io-ml__header-link--active',
      className: 'io-ml__header-link',
    };

    return (
      <div className={cn('io-ml__header-container')}>
        <div className={cn('io-clickable')}>
          <IOLink {...sharedProps} exact={true} to={mainUrlsRoot} >
            <ToolTip id={ToolTipIDs.HOME} />
            <i
              className={cn('fa', 'fa-home')}
              data-tip={ToolTipIDs.HOME}
              data-for={ToolTipIDs.HOME}
            />

          </IOLink>
        </div>
        <div>{!isAuthenticated || isLoading ?
          <IOLink {...sharedProps} to={loginUrlsRoot}>
            <ToolTip id={ToolTipIDs.SIGNIN} />
            <i
              className={cn('fa', 'fa-sign-in')}
              data-tip={ToolTipIDs.SIGNIN}
              data-for={ToolTipIDs.SIGNIN}
            />
          </IOLink> :
          <IOLink {...sharedProps} to={userUrls.profile(`${userId}`)}>
            <ToolTip id={ToolTipIDs.PROFILE} />
            <i
              className={cn('fa', 'fa-user')}
              data-tip={`${useremail} ${ToolTipIDs.PROFILE}`}
              data-for={ToolTipIDs.PROFILE}
            />
          </IOLink>}
        </div>
        <div>{isAuthenticated &&
          <IOLink {...sharedProps} to={blogsUrlsRoot}>
            <ToolTip id={ToolTipIDs.BLOGS} />
            <i
              className={cn('fa', 'fa-rss')}
              data-tip={ToolTipIDs.BLOGS}
              data-for={ToolTipIDs.BLOGS}
            />
          </IOLink>}
        </div>
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
