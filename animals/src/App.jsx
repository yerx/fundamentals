import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import SearchParams from "./components/SearchParams";
import Details from "./components/Details";

const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <header>
          {/* when user clicks on adopt me it takes them back to the home page */}
          <Link to="/">Adopt me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

export default App;
