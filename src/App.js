import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import signUp from './routes/signUp/SignUp';
import signIn from './routes/signIn/SignIn';
import AdminList from './routes/adminList/AdminList';
import RequestAddCompanyList from './routes/requestAddCompanyList/RequestAddCompanyList';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            {/* example route */}
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/signup" component={signUp} />
            <Route exact path="/signin" component={signIn} />
            <Route exact path="/adminlist" component={AdminList} />
            <Route exact path="/signin" component={RequestAddCompanyList} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
