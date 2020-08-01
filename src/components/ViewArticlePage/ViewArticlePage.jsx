import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ViewArticlePage = ({ user, articles, isPublic }) => {


  // if (isPublic) {

  // }

};

function mapState(state) {
  const {
    articlesReducer: { articles },
    authentication: { user }
  } = state;
  return { articles, user, isPublic: !user };
}

const ConnectEditArticlePage = connect(
  mapState
)(ViewArticlePage);
export { ConnectEditArticlePage as ViewArticlePage };

