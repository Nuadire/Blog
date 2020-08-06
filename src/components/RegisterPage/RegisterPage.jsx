import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userActions } from "../../_actions";
import { ROUTS } from "../../_constants";

const redirectToPage = (history) => () => history.push(ROUTS.login); // Правильно ли так делать?

class RegisterPage extends React.PureComponent {
  componentDidMount() {
    const { logout } = this.props;
    logout();
  }

  onFinish = (user) => {
    const { register, history } = this.props;
    register(user, redirectToPage(history));
  };

  render() {
    const { registering } = this.props;

    return (
      <div className="registration-page">
        <h2 className="registration-page__title">Create new account</h2>
        <Form
          name="basic"
          layout="vertical"
          onFinish={this.onFinish}
          className="registration-form"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

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
          <Form.Item
            name="repeatPass"
            label="Repeat Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="agree" valuePropName="checked">
            <Checkbox>
              I agree to the processing of my personal information
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={registering}
            >
              Create
            </Button>
            <div className="registration-page__login">
              Already have an account?&nbsp;
              <Link to={ROUTS.login}>Sign In.</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  registering: PropTypes.bool,
};
RegisterPage.defaultProps = {
  registering: false,
};

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
  logout: userActions.logout,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
