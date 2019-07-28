import React, { Component } from 'react';
import Weather from '../../components/Weather';

export class Dashboard extends Component {
  
  render() {
    return (
      <div>
        <Weather />
      </div>
    )
  }
}

export default Dashboard;
