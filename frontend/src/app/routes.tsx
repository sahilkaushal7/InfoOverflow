import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';
import Login from './views/Login';
import { State, DispatchType } from '../store/types';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import User from './views/User';
import { SignUp } from './views/SignUp';
import { RouteComponentProps } from 'react-router';
import Blogs from './views/Blogs';
import { mainUrlsRoot, loginUrlsRoot, blogsUrlsRoot, userUrlsRoot, signupUrlsRoot } from './urls';

interface PrivateRoute extends RouteProps {
  component?: any;
  render?: (props?: RouteComponentProps) => JSX.Element;
  isAuth: boolean;
  path: string;
}

const PrivateRoute = ({ component, isAuth, path, render, ...rest }: PrivateRoute) => (
  isAuth ? <Route path={path} component={component} render={render} {...rest} /> :
    <Redirect to='/' />
)

interface PropsFromDispatch {
  userSignUp: (name: string, email: string, password: string) => void;
  userLogin: (email: string, password: string) => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface BaseRouterProps extends PropsFromDispatch, PropsFromState { }

interface BaseRouterState { }

class BaseRouter extends React.Component<BaseRouterProps, BaseRouterState> {
  render() {
    const { userLogin, isAuthenticated, isLoading, userSignUp } = this.props;
    return (
      <MainLayout>
        <Switch>
          <Route exact path={mainUrlsRoot} component={Landing} />
          <Route exact path={loginUrlsRoot} render={(props: RouteComponentProps) =>
            !isAuthenticated ?
              <Login userLogin={userLogin} loading={isLoading} {...props} /> :
              <Landing />
          } />
          <Route
            path={signupUrlsRoot}
            render={(props: RouteComponentProps) => <SignUp {...props} userSignUp={userSignUp} loading={isLoading} />}
          />
          <PrivateRoute
            path={userUrlsRoot}
            component={User}
            isAuth={isAuthenticated}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            exact
            path={blogsUrlsRoot}
            render={() => <Blogs />}
          />
        </Switch>
      </MainLayout>
    )
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
    userSignUp: (name: string, email: string, password: string) => (dispatch(actions.authSignUp(name, email, password))),
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);
