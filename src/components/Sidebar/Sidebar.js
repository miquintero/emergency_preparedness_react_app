// import React, { Component } from 'react';
// // import Sidebar from "react-sidebar";
// import { Transition } from 'react-transition-group';
// import styled from 'styled-components';

// import SidebarContent from './SidebarContent';
// import SidebarIcon from './SidebarIcon';

// import './sidebar.css';

// const SidebarContainer = styled.div`
//   height: 100%;
//   width: 70%;
//   max-width: 400px;
//   background-color: lightgray;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 2;
//   justify-content: flex-end;
//   `;

// const AlertText = styled.div`
//   margin-right: 20px;
//   display: flex;
//   justify-content: center;
//   margin-top: 160px;
//   /* align-items: center; */
//   height: 100%;
// `;

// const SidebarIconContainer = styled.div`
//   margin-right: 10px;
//   display: flex; 
//   justify-content: flex-end;
// `;

// export class Sidebar extends Component {

//   constructor(props) {
//     super(props);
//       this.state={
//         isOpen: true
//       }
//     }

//   renderSidebar = () => {
//     if (!this.state.isOpen) {
//       return null;
//     }
//     return <div className="sidebar">
//     </div>
//   }

//   toggleSidebar = () => {
//     this.setState(prevState => ({
//       isOpen: !prevState.isOpen
//     }))
//   }

//   render() {
//     return (
//       <SidebarContainer>
//         {this.renderSidebar()}
//         <SidebarIconContainer>
//           <SidebarIcon
//             isOpen={this.state.isOpen}
//             handleClick={this.toggleSidebar}
//             // onClick={props.click}
//           />
//         </SidebarIconContainer>
//         <AlertText className="alertdesc">
//           <div alertDescription={this.props.alertDescription} isOpen={this.state.isOpen}>            {this.props.alertDescription}
// </div>
//         </AlertText>
//       </SidebarContainer>
//     )
//   }
// }

// export default Sidebar;
