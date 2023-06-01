import React from 'react'
import { useLocation } from 'react-router-dom';

const BookingService = () => {
    const location = useLocation();
    const bookingData = location.state?.bookingData;
    console.log(bookingData);
  return (
    <div>BookingService</div>
  )
}

export default BookingService