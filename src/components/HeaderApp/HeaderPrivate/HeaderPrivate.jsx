import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link , withRouter } from "react-router-dom";
import { Button } from "antd";

import { ROUTS } from "../../../_constants";
import { userActions } from "../../../_actions";
import DEFAULT_IMG from "./smiley-cyrus.jpg";

const redirectToPage = (history) => () => history.push(ROUTS.login);

class HeaderPrivate extends React.PureComponent {
  handleLogout = () => {
    const { history, logout } = this.props;
    logout(redirectToPage(history));
  };

  render() {
    const { user } = this.props;
    return (
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
          onClick={this.handleLogout}
          className="header-app__btn header-app__btn--border header-app__btn--large"
        >
          Log Out
        </Button>
      </div>
    );
  }
}

HeaderPrivate.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

// HeaderPrivate.defaultProps = {
// }

function mapState(state) {
  const { user } = state.authentication;
  return { user };
}

const actionCreators = {
  logout: userActions.logout,
};

const connectHeaderPrivate = connect(mapState, actionCreators)(HeaderPrivate);
const withRouterConnectHeaderPrivate = withRouter(connectHeaderPrivate);
export { withRouterConnectHeaderPrivate as HeaderPrivate };
