import React, { useState } from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import SearchParams from "./components/SearchParams";
import Details from "./components/Details";
import ThemeContext from "./components/ThemeContext";

const App = () => {
  const themeHook = useState("peru");
  return (
    <React.StrictMode>
      {/* wrap the elements in the ThemeContext component and use .Provider to make the theme globally available to all components */}
      <ThemeContext.Provider value={themeHook}>
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
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
