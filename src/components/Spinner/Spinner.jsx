import React from "react";
import "./Spinner.scss";

export const Spinner = ({text}) => (<><div className="spinner" /> <span>{text || ""}</span></>)