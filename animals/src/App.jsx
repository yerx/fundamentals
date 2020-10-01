import React from "react";
import "./App.css";
import SearchParams from "./components/SearchParams";

const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <h1 id="something-important">Adopt me!</h1>
        <SearchParams />
      </div>
    </React.StrictMode>
  );
};

export default App;
