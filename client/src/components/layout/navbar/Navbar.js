import React from 'react'

// Icons
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import logo from '../../../assets/logo.png'

import { Link } from 'react-router-dom';
import { Sidebar } from "../sider/Sidebar.js";
import { IconContext } from 'react-icons';

// CSS
import './Navbar.css';
import { Logout } from '../../../pages';


export const Navbar = ( props ) => {
  const showSidebar = () => props.setSidebar(!props.sidebarVisible);

  return (
    <>
      <div className='navbar'>
        <Link to="#" className='menu-bar'>
          <FaIcons.FaBars onClick={showSidebar}  />
        </Link>

        <div className={ props.sidebarVisible ? 'topLeft move-right' : 'topLeft' }>
          <Link to="/dashboard">
            <span><img src={logo} alt='Logo' className='logo' /></span>
          </Link>
          <Link to="/dashboard" className='logoNameLink'>
            <span className='logoName'>Legeon</span>
          </Link>
        </div>

        <div className='topRight'>
        <Link to="/profile">
        <span><img src={logo} alt='Logo' className='profilephoto' /></span>
        </Link>
        <span className='username-text' > { props.username } </span>
        </div>
      </div>

      <nav className={ props.sidebarVisible ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu-items' onClick={showSidebar} >
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <AiIcons.AiFillCloseCircle />
            </Link>
          </li>
          <IconContext.Provider value={{color: '#fff'}}>
          {Sidebar.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
          </IconContext.Provider>
          <Logout handleLogout={ props.handleLogout }/>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;