import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import Pets from './pages/pets';
import Shell from './components/layout/Shell';

import { Layout } from 'antd';


function App() {

  return (
    <Router>
      <div>
        <Layout>
          <Shell>
            <Route path="/" exact component={Pets} />
            <Route path="/login" exact component={Login} />
          </Shell>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
