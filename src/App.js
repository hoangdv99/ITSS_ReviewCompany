import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ListCompany from "./routes/listCompany/ListCompany";
import RequestAddCompany from "./routes/requestAddCompany/RequestAddCompany";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ListCompany} />
          <Route exact path="/companies" component={ListCompany} />
          <Route exact path="/addCompany" component={RequestAddCompany} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
