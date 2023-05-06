import React from 'react'


const EngageCall = ({ sidebarVisible }) => {
  return (
    <>
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
    <div>EngageCall</div>
    </div>
    </>
  )
}

export default EngageCall