import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../components/Home";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
