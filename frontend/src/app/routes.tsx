import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';
import Login from './views/Login';
import { State, DispatchType } from '../store/types';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import User from './views/User';
import { SignUp } from './views/SignUp';
import { RouteComponentProps } from 'react-router';
import { Blogs } from './views/Blogs';

// const PrivateRoute = ({ component, isAuth, ...rest }) => (
//   isAuth ? <Route {...rest} component={component}/> :
//   <Redirect to='/' />
// )

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
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={(props: RouteComponentProps) =>
            !isAuthenticated ?
              <Login userLogin={userLogin} loading={isLoading} {...props} /> :
              <Landing />
          } />
          <Route exact path='/blogs' render={() => <Blogs />} />
          <Route path='/user/' render={() => <User />} />
          <Route exact path='/signup' render={(props: RouteComponentProps) => <SignUp {...props} userSignUp={userSignUp} loading={isLoading} />} />

          {/* <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles/:articleID' component={Article} />
        <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles' component={Articles} />
        <PrivateRoute exact isAuth={props.isAuthenticated} path='/create' component={CreateArticle} /> */}
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
