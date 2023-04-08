import React from 'react';
import './Dashboard.css'

const Dashboard = ({sidebarVisible}) => {
  return (
    <div className={sidebarVisible ? 'dashboard move-right' : 'dashboard'} >
      Dashboard
    </div>
  )
}

export default Dashboard;