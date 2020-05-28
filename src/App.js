import React, { Suspense } from 'react';
import { Router } from 'react-router';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { createBrowserHistory } from 'history';
import socket from './socket'; 
import Auth from './containers/Auth/Auth'
const history = createBrowserHistory();





class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      client: socket()
    }
  }

  componentDidMount() {
    this.state.client.test();
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <Suspense fallback={<p>...</p>}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Auth}></Route>
           }
          </Switch>
        </Router>
      </Suspense>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
