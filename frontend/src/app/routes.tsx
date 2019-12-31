import React from 'react';
import { Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';
import Login from './views/Login';
import { State, DispatchType } from '../store/types';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import UserAccount from './views/UserAccount';

// const PrivateRoute = ({ component, isAuth, ...rest }) => (
//   isAuth ? <Route {...rest} component={component}/> :
//   <Redirect to='/' />
// )

interface PropsFromDispatch {
  userLogin: (email: string, password: string) => void;
  logout: () => void;
}

interface PropsFromState {
  isAuthenticated: boolean;
  userId: number;
  isLoading: boolean;
}

interface BaseRouterProps extends PropsFromDispatch, PropsFromState { }

interface BaseRouterState { }

class BaseRouter extends React.Component<BaseRouterProps, BaseRouterState> {
  render() {
    const { userLogin, isAuthenticated, userId, logout, isLoading } = this.props;
    return (
      <MainLayout>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={(props) =>
          !isAuthenticated ?
            <Login userLogin={userLogin} loading={isLoading} {...props}/> :
            <Landing />
        } />
        <Route exact path='/user' render={() => <UserAccount userId={userId} logout={logout}/>} />

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
    userId: state.userId,
  }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password))),
    logout: () => dispatch(actions.authLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);