import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Sidebar } from "../sider/Sidebar.js";
import './Navbar.css';
import { IconContext } from 'react-icons';

export const Navbar = () => {
  const [ sidebar, setSidebar ] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className='navbar'>
        <Link to="#" className='menu-bar'>
          <FaIcons.FaBars onClick={showSidebar}  />
        </Link>
      </div>
    </IconContext.Provider>
      <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu-items' onClick={showSidebar}>
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