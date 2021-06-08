import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyDetail from './routes/Company/CompanyDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/company/:companyId' component={CompanyDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
