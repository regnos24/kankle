// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import { Router, Route, Link, hashHistory, RouterContext } from 'react-router';
import CredentialLookup from './components/CredentialLookup.';
import App from './components/App';

// Search component created as a class

/*
  Not Found
*/

const NotFound = () => (
  <div>
    <h1>Not Found!</h1>
    <a href='/'>BACK</a>
  </div>
)


/*
  Routes
*/

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={CredentialLookup}/>
    {/*<Route path="/storage" component={App}/>*/}
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
