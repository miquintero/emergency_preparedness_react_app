import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Details from './Details';

import './App.css';

function App() {
  return (
    <div className="App">
      <h2>vamo</h2>
      <Dashboard />
      <Sidebar />
      <Details />
    </div>
  );
}

export default App;
