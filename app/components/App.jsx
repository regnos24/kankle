import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Reflux from 'reflux';

export default class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    CredentialStore: PropTypes.object.isRequired,
  }

  // getChildContext() {
  //   return {
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      config: null
    }
    //console.log(this.context.CredentialStore.config)
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.setState({ config: this.props.location.state.config })
  }
  render() {
    //const config = this.context.CredentialStore;
    console.log(this.state.config);
    return <div><Link to="/">Home</Link></div>
  }
}
