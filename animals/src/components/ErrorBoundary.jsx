// mostly from reactjs docs
/*
 * the error boundary is a component that sits above all of the components
 * if there isn't an error, you just want to pass through all of the children components
 *
 */

import React, { Component } from "react";
import { Link } from "@reach/router";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // you will get back the error and info on the error
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>to
          go back to the home page or wait five seconds.
        </h1>
      );
    }
    // if there are no errors, return all the children components
    return this.props.children;
  }
}
