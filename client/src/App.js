import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from './actions/actions';
import { Route } from 'react-router-dom';
import { Header } from './components/header';

export class App extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.dispatch(authenticate())
  }

  render() {
    return (
      <Route path='/' component={Header} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(App);