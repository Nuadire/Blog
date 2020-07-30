import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { userActions } from "../../_actions";
import { alertClear } from "../../_actions/actions";
import { ROUTS } from "../../_constants";
import { HeaderPrivate } from "./HeaderPrivate/HeaderPrivate";

import "./HeaderApp.scss";

const Logo = (props) => (
  <Link to={ROUTS.home} {...props}>
    Realworld Blog
  </Link>
);
const Public = () => (
  <div className="header-app__public">
    <Link to={ROUTS.login} className="header-app__btn">
      Sign In
    </Link>
    <Link to={ROUTS.signUp} className="header-app__btn--border header-app__btn--color header-app__btn--large">
      Sign up
    </Link>
  </div>
);


class HeaderApp extends React.PureComponent {
  render() {
    const { isPrivateHeader } = this.props;

    return (
      <div className="header-app">
        <Logo className="header-app__logo" />
        <div className="header-app__autorization">
          {isPrivateHeader ? <HeaderPrivate /> : <Public />}
        </div>
      </div>
    );
  }
}

HeaderApp.propTypes = {
  isPrivateHeader: PropTypes.bool.isRequired,
};

function mapState(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    isPrivateHeader: !!user,
  };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  clearAlert: alertClear,
};

const connectedHeaderApp = connect(mapState, actionCreators)(HeaderApp);
export { connectedHeaderApp as HeaderApp };
