import React from 'react';
import { Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';
import Login from './views/Login';
import { State, DispatchType } from '../store/types';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

// const PrivateRoute = ({ component, isAuth, ...rest }) => (
//   isAuth ? <Route {...rest} component={component}/> :
//   <Redirect to='/' />
// )

interface BaseRouterProps {
  userLogin: (email: string, password: string) => void;
}

interface BaseRouterState {
  isAuthenticated: boolean;
}

class BaseRouter extends React.Component<BaseRouterProps, BaseRouterState> {
  render() {
    const { userLogin } = this.props;
    return (
      <MainLayout>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={() => <Login userLogin={userLogin}/>} />
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
          userLogin: (email: string, password: string) => (dispatch(actions.authLogin(email, password)))
      }
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);