import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Disaster from '../Disaster/Disaster';
import Alert from '../Alert/Alert';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Dashboard} />
        <Route path='/disaster' component={Disaster} />
        <Route path='/alerts/:city' component={Alert} />
      </Router>
    </div>
  );
}

export default App;
