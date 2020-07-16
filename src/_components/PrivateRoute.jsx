/* eslint-disable react/prop-types */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, privateKey, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        privateKey ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {privateKey: user};
}

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export { connectedPrivateRoute as PrivateRoute };
