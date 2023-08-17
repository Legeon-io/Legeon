import React from 'react'

import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';


export const Sidebar = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <RiIcons.RiDashboardFill/>,
    cName: 'nav-text'
  },
  {
    title: 'Services',
    path: '/services',
    icon: <MdIcons.MdVideoChat />,
    cName: 'nav-text'
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: <BsIcons.BsFillBookmarkStarFill />,
    cName: 'nav-text'
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: <FaIcons.FaCreditCard />,
    cName: 'nav-text'
  },
  {
    title: 'Earnings',
    path: '/earnings',
    icon: <GiIcons.GiMoneyStack />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
  /*
  {
    title: 'Community',
    path: '/community',
    icon: <IoIcons.IoIosPeople />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/about',
    icon: <MdIcons.MdFeedback />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <FaIcons.FaHeadphones />,
    cName: 'nav-text'
  },
  */
  {
    title: 'Feedback',
    path: '/feedback',
    icon: <MdIcons.MdFeedback />,
    cName: 'nav-text'
  },
]

export default Sidebar;