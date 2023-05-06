import React from 'react'

const TextQuery = ({ sidebarVisible }) => {
  return (
    <>
    <div className={sidebarVisible ? 'page move-right' : 'page'} >
    <div>TextQuery</div>
    </div>
    </>
  )
}

export default TextQuery