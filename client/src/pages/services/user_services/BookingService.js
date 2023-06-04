import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingService.css';

import logo from '../../../assets/logo.png'

import * as MdIcons from 'react-icons/md';
import { getCallServiceById } from '../../../apis/services/callservices';

const BookingService = () => {
  const { username, title, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [bookingData, setBookingData] = useState(null);

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

  return (
    <>
      {isLoading ? (
        <p className='loading' style={{ background: 'linear-gradient(to right, #0B0C10, #1F2833)' }} >Engaging...</p>
      ) : (
        <>
          <div className="booking-container">
            <div className="space-background">
              <div className="stars" />
              <div className="moon" />
            </div>

            <div className="service-card">
              <div className="user-profile">
                <img src={logo} alt="User Logo" className="logo" />
                <h3 className="username">{bookingData.username}</h3>
              </div>
              <hr className="divider" /> {/* Division line */}

              <div className='column1'>
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
                    <span className="info-value">${bookingData.price}</span>
                  </div>
                </div>
              </div>


              <div className='column2'>
                <div className="calendar">
                  <h1>Schedule</h1>
                </div>
              </div>

              <button className="book-button">Confirm Booking</button>
            </div>
            <br />
          </div>

        </>
      )
      }

    </>
  );
};

export default BookingService;
