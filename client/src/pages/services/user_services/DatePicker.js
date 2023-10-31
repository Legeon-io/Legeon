import React, { useState } from 'react';
import './DatePicker.css'; // Import the CSS file

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedMeridiem, setSelectedMeridiem] = useState('');
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        setSelectedDate(dateValue);

        // Calculate the day based on the selected date
        const selectedDateObj = new Date(dateValue);
        const options = { weekday: 'long' };
        const selectedDay = selectedDateObj.toLocaleDateString('en-US', options);
        setSelectedDay(selectedDay);
    };

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };

    const handleMeridiemChange = (event) => {
        setSelectedMeridiem(event.target.value);
    };

    const handleTimeZoneChange = (event) => {
        setSelectedTimeZone(event.target.value);
    };

    const handleConfirmBooking = () => {
        // Perform further processing or validation with the selected values
        console.log("Selected Date:", selectedDate);
        console.log("Selected Time:", selectedHour + ":" + selectedMinute + ":" + selectedMeridiem);
        console.log("Selected Day:", selectedDay);
        console.log("Selected Timezone:", selectedTimeZone);
        // Add your logic for confirming the booking
    };

    return (
        <div className="date-picker">
            <div className='date'>
                <h2 className="date-picker__title">Date</h2>
                <input className="date-picker__select" type="date" value={selectedDate} onChange={handleDateChange} />
            </div>

            <div className='day'>
                <h2 className="date-picker__title">Day</h2>
                <div className='day-display'>
                    {selectedDate === '' ? "Day not selected" : <p>{selectedDay}</p>}
                </div>
            </div>

            <div className='time'>
                <h2 className="date-picker__title">Time</h2>
                <div className="date-picker__select-group">
                    <select className="time-picker__select" value={selectedHour} onChange={handleHourChange}>
                        <option value="">Hour</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="11">12</option>
                        <option value="11">01</option>
                        <option value="11">02</option>
                        <option value="11">03</option>
                        <option value="11">04</option>
                        <option value="11">05</option>
                        <option value="11">06</option>
                        <option value="11">07</option>
                        <option value="11">08</option>
                        {/* Add more hour options as needed */}
                    </select>
                    <select className="time-picker__select" value={selectedMinute} onChange={handleMinuteChange}>
                        <option value="">Minute</option>
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                    </select>
                    <select className="time-picker__select" value={selectedMeridiem} onChange={handleMeridiemChange}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>

            <div className='timezone'>
                <h2 className="date-picker__title">Timezone</h2>
                <select className="timezone-picker__select" value={selectedTimeZone} onChange={handleTimeZoneChange}>
                    <option value="">Select a timezone</option>
                    {/* <option value="UTC-5">UTC-5 (EST)</option>
          <option value="UTC-4">UTC-4 (EDT)</option>
          <option value="UTC+0">UTC+0 (GMT)</option>
          <option value="UTC+1">UTC+1 (BST)</option> */}
                    <option value="UTC+5.5">Asia/Kolkata (IST) UTC+5:30</option>
                    {/* <option value="UTC+8">UTC+8 (PST)</option> */}
                </select>
            </div>

            <button className="date-picker__button" onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
    );
};

export default DatePicker;
