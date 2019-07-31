// import React, { Component } from 'react'
// import styled from 'styled-components'
// import Sidebar from '../Sidebar/Sidebar';
// import AlertBackdrop from '../AlertBackdrop/AlertBackdrop';
// import Header from '../Header/Header';

// import LogoImg from '../../assets/listo_transp.png';


// const CityDetailsPage = styled.div`
//  margin: auto;
// `;

// export class AlertDetails extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       sidebarOpen: false,
//       city: ''
//     }
//   }
  
//   componentDidMount () {
//     this.setState({city: this.props.match.params.city})
//   }

//   sidebarClickHandler = () => {
//     this.setState((prevState) => {
//       return {sidebarOpen: !prevState.sidebarOpen}
//     })
//   }

//   backdropClickHandler = () => {
//     this.setState({sidebarOpen: false})
//   }

//   // toggleButton = () => {
//   //   click={sidebarClickHandler}
//   // }
  
//   render() {
//     let sideBar;
//     let alertBackdrop;
//     if (this.state.sidebarOpen) {
//       sideBar = <Sidebar />;
//       alertBackdrop=<AlertBackdrop />
//     }

//     return (
//       <CityDetailsPage>
//         <Header />
//         {sideBar}
//         <AlertBackdrop city={this.state.city} clickBackdrop={this.backdropClickHandler} clickHandler={this.sidebarClickHandler} />
//       </CityDetailsPage>
//     )
//   }
// }

// export default AlertDetails;