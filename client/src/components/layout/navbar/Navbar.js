import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Sidebar } from "../sider/Sidebar.js";

export const Navbar = () => {
  const [ sidebar, setSidebar ] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
      <div className='navbar'>
        <Link to="#" className='menu-bar'>
          <AiIcons.AiOutlineBars onClick={showSidebar}  />
        </Link>
      </div>
      <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu items'>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <AiIcons.AiFillCloseCircle />
            </Link>
          </li>
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
        </ul>
      </nav>
    </>
  )
}

export default Navbar;