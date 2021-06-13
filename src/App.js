import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyDetail from './routes/Company/CompanyDetail';
import './App.css';
import signIn from './routes/admin/signIn/SignIn';
import AdminList from './routes/admin/adminList/AdminList';
import RequestAddCompanyList from './routes/admin/requestAddCompanyList/RequestAddCompanyList';
import { AuthProvider } from './contexts/AuthContext';
import ListCompany from "./routes/listCompany/ListCompany";
import RequestAddCompany from "./routes/requestAddCompany/RequestAddCompany";
// import admin route
import adminListCompany from "./routes/admin/listCompany/ListCompany";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            {/* master */}
            <Route exact path='/company/:companyId' component={CompanyDetail} />
            <Route exact path="/" component={ListCompany} />
            {/* admin */}
            <Route exact path="/admin/companies" component={adminListCompany} />
            <Route exact path="/addCompany" component={RequestAddCompany} />
            {/* thang */}
            <Route exact path="/signin" component={signIn} />
            <PrivateRoute exact path="/admin/admin-list" component={AdminList} />
            <PrivateRoute exact path="/admin/company-request-list" component={RequestAddCompanyList} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
