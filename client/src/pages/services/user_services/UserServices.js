import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCallService } from '../../../apis/services/callservices';
import { getUser } from '../../../apis/users/users.api';

import './UserServices.css'

const UserServices = ({ sidebarVisible }) => {

    const { username } = useParams();
    const [callServiceData, setcallServiceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userPresent, setUserPresent] = useState(true);

    const [showpopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            const userData = await getUser(username);
            if (userData.response.status === 401) {
                setUserPresent(false);
                setIsLoading(false);
            }
            else {
                setUserPresent(true);
                const { response, data } = await getCallService(username);
                if (response.status === 200) {
                    setcallServiceData(data.user);
                    setIsLoading(false);
                } else {
                    console.log('Internal Server Error, data not received', response.error);
                }
            }
        }
        const delay = setTimeout(() => {
            fetchData();
        }, 200);

        return () => clearTimeout(delay);
    }, [username]);



    const handleCancel = () => {
        setMessage("");
        setShowPopup(false);
    }

    return (
        <>
            {isLoading ? (
                <p className='loading' style={{ background: 'linear-gradient(to right, #0B0C10, #1F2833)' }} >Engaging...</p>
            ) :

                (userPresent ?

                    (
                        <>
                            <div className='service-username'>{username}</div> <br/>
                            <div className={sidebarVisible ? 'userservices-page move-right' : 'userservices-page'} >
                                <div className='user-service_cards-container'>
                                    {callServiceData.map((service, index) => (

                                        <div className="service_card" key={index}>
                                            <div className="service_card-header">
                                                <h2 className="service_card-title"> {service.title} </h2>
                                                <div className="service_card-price">Rs. {service.price} /-</div>
                                            </div>
                                            <div className="service_card-body">
                                                {/* <p className="service_card-description">Description of the service goes here</p> */}
                                                <p className="service_card-description">{service.servicetype === "EngageCall" ? "1:1 Call" : ""}</p>
                                                <div className="service_card-call-duration">
                                                    <strong>Call duration:</strong> {service.duration} minutes
                                                </div>

                                                <div className="edit-delete-button-container">
                                                    {/* <button className="edit-button" onClick={() => handleEdit(index)} >Edit</button>
                                                    <button className="edit-button" style={{ backgroundColor: "#FF6347" }} onClick={() => handleDelete(index)} >Delete</button> */}
                                                </div>

                                            </div>
                                        </div>

                                    ))}

                                </div>
                                <br />

                            </div>
                        </>
                    )
                    :

                    (
                        <>
                            <div className='user-not-present' >User "{username}" not registered</div>
                            <br />
                        </>
                    )
                )
            }
        </>
    )
}

export default UserServices