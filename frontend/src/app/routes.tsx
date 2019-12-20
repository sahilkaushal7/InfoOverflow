import React from 'react';
import { Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './views/Landing';

// const PrivateRoute = ({ component, isAuth, ...rest }) => (
//   isAuth ? <Route {...rest} component={component}/> :
//   <Redirect to='/' />
// )

interface BaseRouterProps { }

const BaseRouter: React.FC<BaseRouterProps> = () => (
  <MainLayout>
    <Route exact path='/' component={Landing} />
    {/* <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles/:articleID' component={Article} />
    <PrivateRoute exact isAuth={props.isAuthenticated} path='/articles' component={Articles} />
    <PrivateRoute exact isAuth={props.isAuthenticated} path='/create' component={CreateArticle} /> */}
  </MainLayout>
)

export default BaseRouter;