import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ROUTS } from "../../../_constants";
import DefaultIcon from "./smiley-cyrus.jpg";
import { userActions } from "../../../_actions";
import "./user.scss";

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
        src={user.image || DefaultIcon}
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
function mapState(state) {
  const { user } = state.authentication;
  return { user };
}

const actionCreators = {
  logout: userActions.logout,
};

const connectHeaderPrivate = connect(mapState, actionCreators)(HeaderPrivate);
export { connectHeaderPrivate as HeaderPrivate };
