import React from 'react';

import MenuIcon from '../../assets/menu-thick-black.png';

function Sidebar () {

  const handleClick = () => {
    const sidebarWrapper = document.getElementById('wrapper');
    sidebarWrapper.classList.toggle('is-sidebar-open');
  };

  return (
    <div>
      <div className='sidebar-icon' type='menu-fold' onClick={handleClick}> 
        <img src={MenuIcon} alt='menu' height='42px' />
      </div>
      <div id='wrapper' className='wrapper'>
        <div className='sidebar-body'>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;