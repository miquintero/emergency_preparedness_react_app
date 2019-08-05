import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EmergencyDetails from '../EmergencyDropdown/EmergencyDropdown';
import AlertBackdrop from '../AlertBackdrop/AlertBackdrop';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Dashboard} />
        <Route path='/disaster' component={EmergencyDetails} />
        <Route path='/alerts/:city' component={AlertBackdrop} />
      </Router>
    </div>
  );
}

export default App;
