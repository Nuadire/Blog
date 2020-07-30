import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userActions } from "../../_actions";
import { ROUTS } from "../../_constants";
import "./RegistrationPage.scss";

const redirectToPage = (history) => () => history.push(ROUTS.login);

const RegisterPage = ({ register, registering, history }) => {
  const onFinish = (user) => {
    register(user, redirectToPage(history));
  };

  return (
    <div className="registration-page">
      <h2 className="registration-page__title">Create new account</h2>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
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
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
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
          <Button block type="primary" htmlType="submit" loading={registering}>
            Create
          </Button>
          <div className="registration-page__login">
            Already have an account?&nbsp;
            <Link to={ROUTS.login}>
              Sign In.
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

RegisterPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
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
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
