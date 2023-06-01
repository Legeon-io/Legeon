import React from 'react';
import './Dashboard.css'
import '../index.css'

const Dashboard = ({sidebarVisible}) => {
  return (
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
      Dashboard
    </div>
  )
}

export default Dashboard;