import React from "react";

// // Icons
// import * as AiIcons from 'react-icons/ai';
// import * as FaIcons from 'react-icons/fa';

// import logo from '../../../assets/logo.png'

// import { Link } from 'react-router-dom';
// import { Sidebar } from "../sider/Sidebar.js";
// import { IconContext } from 'react-icons';

// CSS
import "./Navbar.css";
// import { Logout } from '../../../pages';

export const Navbar = (props) => {
  // const showSidebar = () => props.setSidebar(!props.sidebarVisible);

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      {/* <div className='navbar'>
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
        <div className=" flex gap-5">
          <a
            className="bg-gradient-to-r  hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300 mt-2 text-lg"
            href="#"
          >
            Services
          </a>
          <a
            className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold hover:text-violet-600  duration-300  mt-2 text-lg"
            href=""
          >
            Calender
          </a>
          <a
            className="bg-gradient-to-r hidden md:block to-pink-500 from-indigo-500  via-purple-500 text-transparent bg-clip-text font-semibold  hover:text-violet-600  duration-300  mt-2 text-lg"
            href="http://localhost:3000/dashboard"
          >
            Payments
          </a>
          <div className="mt-0.5 mr-1 flex justify-center items-center">
            <Toggle
              ischecked={checked}
              handleChange={handleChanges}
              onClick={handleClick}
            />
          </div>
          <button className=" hidden md:block bg-gradient-to-r m-1 p-2 text-white rounded-md to-pink-500  from-indigo-500  via-purple-500 hover:opacity-80  duration-300">
            Login
          </button>
          <button className="  hidden md:block bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 m-1 p-2 text-white rounded-md hover:opacity-80  duration-300">
            Register
          </button>
          <button
            className="  md:hidden block  bg-gradient-to-r  to-pink-500 from-indigo-500  via-purple-500 m-1 p-2 text-white rounded-md hover:opacity-80  duration-300"
            onClick={openMenu}
          >
            menu
          </button>
        </div>
      </nav>

      <nav className={ props.sidebarVisible ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu-items' onClick={showSidebar} >
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
          <Logout handleLogout={ props.handleLogout }/>
        </ul>
      </nav> */}
    </>
  );
};

export default Navbar;
