import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ROUTS } from "../../../_constants";
import { userActions } from "../../../_actions";
import "./user.scss";
import DEFAULT_IMG from "./smiley-cyrus.jpg";

const HeaderPrivate = ({ user, logout }) => (
  <div className="header-app__private">
    <Link
      to={ROUTS.createArticle}
      className="header-app__btn header-app__btn--border header-app__btn--color "
    >
      Create article
    </Link>
    <div className="user">
      <span className="user__name">{user.username}</span>
      <img
        className="user__icon"
        src={user.image || DEFAULT_IMG}
        alt="avatar"
      />
    </div>
    <Button
      onClick={logout}
      className="header-app__btn header-app__btn--border header-app__btn--large"
    >
      Log Out
    </Button>
  </div>
);

HeaderPrivate.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
}

HeaderPrivate.defaultProps = {
}

function mapState(state) {
  const { user } = state.authentication;
  return { user };
}

const actionCreators = {
  logout: userActions.logout,
};

const connectHeaderPrivate = connect(mapState, actionCreators)(HeaderPrivate);
export { connectHeaderPrivate as HeaderPrivate };
