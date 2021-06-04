import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListCompany from "./routes/listCompany/ListCompany";
import RequestAddCompany from "./routes/requestAddCompany/RequestAddCompany";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/companies" component={ListCompany} />
            <Route exact path="/addCompany" component={RequestAddCompany} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
