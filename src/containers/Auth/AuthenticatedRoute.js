import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = false
  if (localStorage.getItem('token') !== null) {
    isLoggedIn = true
  }
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
      }
    />
  );

}
export default AuthenticatedRoute;