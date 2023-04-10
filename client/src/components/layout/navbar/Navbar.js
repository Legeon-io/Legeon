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
import { Login } from '../../../pages/index.js';


export const Navbar = ({sidebarVisible, setSidebar}) => {
  const showSidebar = () => setSidebar(!sidebarVisible);

  return (
    <>
      <div className='navbar'>
        <Link to="#" className='menu-bar'>
          <FaIcons.FaBars onClick={showSidebar}  />
        </Link>

        <div className={ sidebarVisible ? 'topLeft move-right' : 'topLeft' }>
          <Link to="/dashboard">
            <span><img src={logo} alt='Logo' className='logo' /></span>
          </Link>
          <Link to="/dashboard" className='logoNameLink'>
            <span className='logoName'>Legeon</span>
          </Link>
        </div>

        <div className='topRight'>
          <Login />
        </div>
      </div>

      <nav className={ sidebarVisible ? 'nav-menu active' : 'nav-menu' }>
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
        </ul>
      </nav>
    </>
  )
}

export default Navbar;