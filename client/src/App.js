import React from 'react';
import { connect } from 'react-redux';
import { logIn } from './actions/actions';

export class App extends React.Component {
  onLogIn(e) {
    e.preventDefault();
    console.log('running');
    this.props.dispatch(logIn());
  }

  render() {
    return (
      <a href="#" onClick={e => this.onLogIn(e)}>Log in with discord</a>
    )
  }
} 

const mapStateToProps = state => ({
  characters: state.characters,
  loading: state.loading,
  error: state.error
});

export default connect()(App);