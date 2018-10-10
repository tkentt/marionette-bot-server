import React from 'react';
import {
  connect
} from 'react-redux';
import {
  authenticate
} from './actions/actions';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(authenticate())
  }

  render() {
    return ( 
      <a href="http://localhost:8080/auth/discord"> Log in with discord </a>
    )
  }
}

// const mapStateToProps = state => ({
// });

export default connect()(App);