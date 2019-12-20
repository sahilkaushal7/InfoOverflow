import React, { Dispatch } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './app/routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import { State } from './store/types';
import { ThunkDispatch } from 'redux-thunk';

interface AppProps {
  onTryAutoSignUp: any;
}

class App extends React.Component<AppProps> {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <BaseRouter />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    isAuthenticated: state.token !== null,
    isLoading: state.loading
  }
}

type dipatchAuthCheck = ThunkDispatch<State, {}, any> & Dispatch<any>;
const mapDispatchToProp = (dispatch: dipatchAuthCheck) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(App);
