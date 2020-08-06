import React from "react";
import PropTypes from "prop-types";

export const Spinner = ({ text }) => (
  <>
    <div className="spinner" /> <span>{text || ""}</span>
  </>
);

Spinner.propTypes = {
  text: PropTypes.string,
};
Spinner.defaultProps = {
  text: "Loading...",
};
