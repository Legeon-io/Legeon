import React from 'react'

import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';


export const Sidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <ImIcons.ImHome />,
    cName: 'nav-text'
  },
  {
    title: 'Engage',
    path: '/engage',
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
    title: 'Earnings',
    path: '/earnings',
    icon: <RiIcons.RiMoneyDollarCircleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
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
  {
    title: 'Feedback',
    path: '/feedback',
    icon: <MdIcons.MdFeedback />,
    cName: 'nav-text'
  },
]

export default Sidebar;