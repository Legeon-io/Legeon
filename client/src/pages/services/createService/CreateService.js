import React, { useState } from 'react'
import '../Services.css'
import './CreateService.css'
import { Link } from 'react-router-dom';
import EngageCall from './EngageCall';

const CreateService = ({ sidebarVisible, currentTab = 'engageCall' }) => {

    const [activeTab, setActiveTab] = useState(currentTab);

    const handleTabToChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <EngageCall sidebarVisible={sidebarVisible} />
            {/* <div className={sidebarVisible ? 'page move-right' : 'page'} >

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

                    <div className='button-container'>
                        <span className='profile-span'>
                            <Link to='/services/create-service/engage-call' style={{ textDecoration: 'none' }} >
                                <button className={activeTab === "engageCall" ? "active" : ""} onClick={() => handleTabToChange("engageCall")}>
                                    1:1 Engage
                                </button>
                            </Link>
                        </span>
                        <span className='account-span'>
                            <Link to='/services/create-service/text-query' style={{ textDecoration: 'none' }} >
                                <button className={activeTab === "textQuery" ? "active" : ""} onClick={() => handleTabToChange("textQuery")}>
                                    Ask Query?
                                </button>
                            </Link>
                        </span>


                    </div>
                </div>
            </div> */}

        </>
    )
}

export default CreateService