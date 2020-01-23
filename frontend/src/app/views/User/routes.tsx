import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Profile from './components/Profile';
import { userUrls } from '../../urls';
import { Landing } from '../Landing';

interface UserRouteProps {
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserRoute: React.FC<UserRouteProps> = ({ logout, isAuthenticated, isLoading }) => {

  return (
    <Switch>
      <Route exact path={userUrls.profile()} render={(props: RouteComponentProps) => <Profile urlParams={props.match.params} logout={logout} />} />
      <Route path={'*'} component={Landing} />
    </Switch>)
}

export default UserRoute;
