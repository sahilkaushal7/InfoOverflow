import React from 'react';
import { Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';
import Login from './views/Login';
import { State, DispatchType } from '../store/types';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import UserAccount from './views/UserAccount';
import { SignUp } from './views/SignUp';
import { RouteComponentProps } from 'react-router';

// const PrivateRoute = ({ component, isAuth, ...rest }) => (
//   isAuth ? <Route {...rest} component={component}/> :
//   <Redirect to='/' />
// )

interface PropsFromDispatch {
  userSignUp: (name: string, email: string, password: string) => void;
  userLogin: (email: string, password: string) => void;
  logout: () => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface BaseRouterProps extends PropsFromDispatch, PropsFromState { }

interface BaseRouterState { }

class BaseRouter extends React.Component<BaseRouterProps, BaseRouterState> {
  render() {
    const { userLogin, isAuthenticated, logout, isLoading, userSignUp } = this.props;
    return (
      <MainLayout>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={(props: RouteComponentProps) =>
          !isAuthenticated ?
            <Login userLogin={userLogin} loading={isLoading} {...props}/> :
            <Landing />
        } />
        <Route exact path={`/user/:id`} render={(props: RouteComponentProps) => <UserAccount urlParams={props.match.params} logout={logout}/>} />
        <Route exact path='/signup' render={(props: RouteComponentProps) => <SignUp {...props} userSignUp={userSignUp} loading={isLoading}/>} />

        {/* <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles/:articleID' component={Article} />
        <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles' component={Articles} />
        <PrivateRoute exact isAuth={props.isAuthenticated} path='/create' component={CreateArticle} /> */}
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
    logout: () => dispatch(actions.authLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);
