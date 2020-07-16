import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomePage = ({ user }) => (
  <>
    <h1>Hi {user.username}!</h1>
    <p>
      <Link to="/login">
        Logout
      </Link>
    </p>
  </>
);

HomePage.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string }).isRequired,
};

function mapState(state) {
  const {
    authentication: { user },
  } = state;
  return user;
}

const connectedHomePage = connect(mapState)(HomePage);
export { connectedHomePage as HomePage };
