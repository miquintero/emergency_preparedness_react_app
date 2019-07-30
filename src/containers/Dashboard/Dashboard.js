import React, { Component } from 'react';
import Weather from '../../components/Weather';
// import Header from '../Header/Header';

export class Dashboard extends Component {
  
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Weather />
      </div>
    )
  }
}

export default Dashboard;
