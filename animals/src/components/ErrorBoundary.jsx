// mostly from reactjs docs
/*
 * the error boundary is a component that sits above all of the components
 * if there isn't an error, you just want to pass through all of the children components
 *
 */

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

export default class ErrorBoundary extends Component {
  // add redirect property to state
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  // you will get back the error and info on the error
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  // use componentDidUpdate so when there is a change to the state redirect to the home page
  componentDidUpdate() {
    if (this.state.hasError) {
      // redirect to home page after 5000 ms
      setTimeout(() => this.setState({ redirect: true }));
    }
  }
  render() {
    // add the redirect conditional to use reach/router to redirect to home page
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
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
