import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Profile from './components/Profile';
import { State, DispatchType } from '../../../store/types';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { userUrls } from '../../urls';
import { Landing } from '../Landing';

interface PropsFromDispatch {
  logout: () => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface UserRouteProps extends PropsFromDispatch, PropsFromState { }

interface UserRouteState { }

class UserRoute extends React.Component<UserRouteProps, UserRouteState> {
  render() {
    const { logout } = this.props;
    return (
      <Switch>
        <Route exact path={userUrls.profile()} render={(props: RouteComponentProps) => <Profile urlParams={props.match.params} logout={logout} />} />
        <Route path={'*'} component={Landing}/>
      </Switch>)
  }
}

const mapStateToProps = (state: State) => {
  return {
    isLoading: state.loading,
    error: state.error,
    isAuthenticated: (state.token !== null),
  }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    logout: () => dispatch(actions.authLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);
