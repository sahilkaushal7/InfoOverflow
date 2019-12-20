import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './app/routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import { State, DispatchType } from './store/types';

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

const mapDispatchToProp = (dispatch: DispatchType) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(App);
