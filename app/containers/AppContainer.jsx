import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, RouterContext } from 'react-router';
import { CredentialLookupActions } from './../actions.jsx';
import CredentialStore from './../stores/CredentialStore.jsx';
import App from './../components/App.jsx';
import CredentialLookup from './../components/CredentialLookup.jsx';

class AppContainer extends React.Component {
  static childContextTypes = {
    CredentialLookupActions: PropTypes.object,
    CredentialStore: PropTypes.object,
    router: PropTypes.func,
    route: PropTypes.func
  };

  getChildContext() {
    return {
      CredentialStore: CredentialStore,
      CredentialLookupActions: CredentialLookupActions,
      router: Router,
      route: Route
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={CredentialLookup}/>
        <Route path="/app" component={App}/>
      </Router>
    );
  }
}

const NotFound = () => (
  <div>
    <h1>Not Found!</h1>
    <a href='/'>BACK</a>
  </div>
)

ReactDOM.render(<AppContainer />, document.querySelector('#main'));
