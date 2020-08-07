import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "antd";
import { HeaderApp } from "../HeaderApp/HeaderApp";

import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { EditArticlePage } from "../EditArticlePage/EditArticlePage";
import { ViewArticlePage } from "../ViewArticlePage/ViewArticlePage"
import { ROUTS } from "../../_constants";

class App extends React.PureComponent {
  render() {
    const { alert } = this.props;
    return (
      <div className="app">
        {alert.message && <Alert type={alert.type} message={alert.message} closable />}
        <HashRouter>
          <HeaderApp />
          <Switch>
            <Route exact path={ROUTS.home} component={HomePage} />
            <Route path={ROUTS.login} component={LoginPage} />
            <Route path={ROUTS.signUp} component={RegisterPage} />
            <Route exact path={ROUTS.createArticle} component={EditArticlePage} />
            <Route exact path={ROUTS.editArticle} component={EditArticlePage} />
            <Route exact path={ROUTS.fullTextArticle} component={ViewArticlePage} />
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

// {alert.message && <Alert type={alert.type} message={alert.message} />}
