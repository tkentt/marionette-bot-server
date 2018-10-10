import React from 'react';
import { connect } from 'react-redux'
import qs from 'query-string'

export function Header(props) {
  console.log(props);
  return (
    <a href="http://localhost:8080/auth/discord">Log in with discord </a>
  );
}

const mapStateToProps = (state, props) => ({
  authToken: qs.parse(props.location.search).token
})

export default connect(mapStateToProps)(Header)