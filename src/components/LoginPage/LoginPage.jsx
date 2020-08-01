import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userActions } from "../../_actions";
import { alertClear } from "../../_actions/actions";
import { ROUTS } from "../../_constants";
import "./LoginPage.scss";

const redirectToHome = (history) => () => history.push(ROUTS.home);

class LoginPage extends React.PureComponent {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  onFinish = ({ email, password }) => {
    const { login, history } = this.props;
    login(email, password, redirectToHome(history));
  };

  render() {
    const { loggedIn, clearAlert } = this.props;
    return (
      <div className="login-page">
        <h2 className="login-page__title">Sign In</h2>
        <Form
          layout="vertical"
          name="basic"
          onFinish={this.onFinish}
          className="login-page__form"
        >
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loggedIn}>
              Login
            </Button>
            <div className="login-page__signup">
              Don’t have an account?&nbsp;
              <Link
                to={ROUTS.signUp}
                onClick={clearAlert}
              >
                Sign Up.
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
LoginPage.defaultProps = {
  loggedIn: false,
};

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  clearAlert: alertClear,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
