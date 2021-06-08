import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyDetail from './routes/Company/CompanyDetail';

import ListCompany from "./routes/listCompany/ListCompany";
import RequestAddCompany from "./routes/requestAddCompany/RequestAddCompany";
import React from "react";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/company/:companyId' component={CompanyDetail} />
            <Route exact path="/" component={ListCompany} />
            <Route exact path="/companies" component={ListCompany} />
            <Route exact path="/addCompany" component={RequestAddCompany} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
