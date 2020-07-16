import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "antd";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { ROUTS } from "../_constants";
import "./app.css";


class App extends React.PureComponent {
  render() {
    const { alert } = this.props;
    return (
      <div className="app">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
        <HashRouter>
          <Switch>
            <PrivateRoute exact path={ROUTS.routHome} component={HomePage} />
            <Route path={ROUTS.routLogin} component={LoginPage} />
            <Route path={ROUTS.routSignUp} component={RegisterPage} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string).isRequired,
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const connectedApp = connect(mapState)(App);
export { connectedApp as App };
