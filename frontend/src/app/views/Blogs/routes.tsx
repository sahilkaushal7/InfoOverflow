import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { State, DispatchType } from '../../../store/types';
import { connect } from 'react-redux';
import { blogsUrls } from '../../urls';
import { Blogs } from './components/AllBlogs';
import { PersonalBlogs } from './components/Personal';
import { CreateBlog } from './components/CreateBlog';

interface PropsFromDispatch { }

interface PropsFromState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: number;
}

interface UserRouteProps extends PropsFromDispatch, PropsFromState { }

interface UserRouteState { }

class UserRoute extends React.Component<UserRouteProps, UserRouteState> {
  render() {
    const { userId } = this.props;
    return (
      <Switch>
        <Route exact path={blogsUrls.landing()} render={(props: RouteComponentProps) => <Blogs userId={userId} />} />
        <Route exact path={blogsUrls.myblogs()} render={(props: RouteComponentProps) => <PersonalBlogs urlParams={props.match.params} />} />
        <Route exact path={blogsUrls.createNewBlog()} render={(props: RouteComponentProps) => <CreateBlog userId={userId} />} />
      </Switch>)
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);
