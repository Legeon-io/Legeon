import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingService.css';

import logo from '../../../assets/logo.png'

import * as MdIcons from 'react-icons/md';
import { getCallServiceById } from '../../../apis/services/callservices';
import { schedule_event } from '../../../apis/bookings/calendar';
import DatePicker from './DatePicker';

import * as HiIcons from 'react-icons/hi';

const BookingService = ({ sidebarVisible }) => {
  const { username, title, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [bookingData, setBookingData] = useState(null);
  console.log(sidebarVisible);

  useEffect(() => {
    async function fetchData() {
      const { response, data } = await getCallServiceById(username, id);
      if (response.status === 200) {
        setBookingData(data.user);
        setIsLoading(false);
      } else {
        console.log('Internal Server Error, data not received', response.error);
      }
    }
    const delay = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delay);
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const authUrl = 'http://localhost:8000/google';

    const windowFeatures = 'width=600,height=600,top=100,left=100';
    const popupWindow = window.open(authUrl, 'AuthWindow', windowFeatures);

    const checkPopupClosed = setInterval(() => {
      if (popupWindow.closed) {
        clearInterval(checkPopupClosed);
        // Perform actions after pop-up window is closed
        // For example, make an API request to complete the process
        schedule_event();
      }
    }, 1000);
  };



  return (
    <>
      {isLoading ? (
        <p className='loading' style={{ background: 'linear-gradient(to right, #0B0C10, #1F2833)' }} >Engaging...</p>
      ) : (
        <>
          <div className={sidebarVisible ? 'bookingservice-page move-right' : 'bookingservice-page'} >

            <div className="space-background">
              <div className="stars" />
              <div className="moon" />
            </div>
            <div className='booking-container'>
              <div className="service-container">

                <div className="service-card">
                  <div className="user-profile">
                    <img src={logo} alt="User Logo" className="logo" />
                    <h3 className="username">{bookingData.username}</h3>
                  </div>
                  <hr className="divider" /> {/* Division line */}

                  <div className="header">
                    <h2 className="service-title">{bookingData.title}</h2>
                  </div>

                  <div className="service-info">
                    <div className="info-row">
                      <span className="service-type"><MdIcons.MdVideoChat /> {bookingData.servicetype === "EngageCall" ? "1:1 Call" : ""}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Duration:</span>
                      <span className="info-value">{bookingData.duration} mins</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Price:</span>
                      <span className="rupee"><HiIcons.HiCurrencyRupee />{bookingData.price}</span>
                    </div>
                  </div>

                  {/* <button className="book-button" onClick={handleSubmit}>Confirm Booking</button> */}
                </div>
                <br />
              </div>

              <div className="calendar">
                <DatePicker />
              </div>
            </div>

          </div>

        </>
      )
      }

    </>
  );
};

export default BookingService;
