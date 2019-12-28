import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import Pets from './pages/pets';
import Shell from './components/layout/Shell';

function App() {

  return (
    <Router>
      <div>
        <Shell>
          <Route path="/" exact component={Pets} />
          <Route path="/login" exact component={Login} />
        </Shell>
      </div>
    </Router>
  );
}

export default App;
