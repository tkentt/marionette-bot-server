import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from './actions/actions';
import { Route } from 'react-router-dom';
import Header from './components/header';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(authenticate())
  }

  render() {
    return (
      <Route path='/auth' component={Header} />
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.authToken
});

export default connect(mapStateToProps)(App);