import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* example route */}
          {/* <Route exact path="/login" component={Login} /> */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
