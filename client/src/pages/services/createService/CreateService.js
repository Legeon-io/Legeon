import React from 'react'
import '../Services.css'

const CreateService = ({ sidebarVisible }) => {
    return (
        <>

            <div className={sidebarVisible ? 'page move-right' : 'page'} >

                <div className='services-container'>
                    <span className='services-text'>
                        Services
                    </span>
                </div>
            </div>

            <div className='division'></div>

            <div className={sidebarVisible ? 'services-types move-right' : 'services-types'} >
                <div className='services-type'>
                    Service Type

                    <div className='types'>
                        <button className='engagecall'> 1:1 Engage</button>
                        <button className='text-query'> Ask Query?</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateService