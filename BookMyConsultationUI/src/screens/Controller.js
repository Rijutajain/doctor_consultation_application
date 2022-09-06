import React from "react";
import Home from "../screens/home/Home";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
    <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl}/>}
        />
      </div>
    </Router>
  );
};

export default Controller;
