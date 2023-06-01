import React, { useState } from 'react'
import Popup from '../Popup';
import { useLocation } from 'react-router-dom';
import { updateCallService } from '../../../apis/services/callservices';

const EditCallServiceForm = () => {

    const location = useLocation();
    const formData = location.state?.formData;

    const [title, setTitle] = useState(formData.title);
    const [duration, setDuration] = useState(formData.duration);
    const [price, setPrice] = useState(formData.price);

    const [customBool, setCustomBool] = useState(false);
    const [customPriceBool, setCustomPriceBool] = useState(false);
    const [showpopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.title === title && formData.duration === duration && formData.price === price) {
            setMessage("No changes done yet");
            setShowPopup(true);
        }
        else {

            const { response, data } = await updateCallService(formData.username, formData.servicetype, formData.title, formData.duration, formData.price, title, duration, price);

            if (response.status === 200) {
                setMessage(data.message);
                setShowPopup(true);
            }
        }
    }

    const handleDurationChange = (event) => {
        if (event.target.id === 'customCall')
            setCustomBool(true);
        else
            setCustomBool(false);

        if (event.target.value === 'custom')
            setDuration(0)
        else
            setDuration(parseInt(event.target.value));
    };

    const handleCustomDurationChange = (event) => {
        setDuration(parseInt(event.target.value));

        if (event.target.value === '')
            setDuration(0)
        else
            setDuration(parseInt(event.target.value));
    };

    const handlePriceChange = (event) => {
        if (event.target.id === 'customPrice')
            setCustomPriceBool(true);
        else
            setCustomPriceBool(false);

        if (event.target.value === 'custom')
            setPrice(0)
        else
            setPrice(parseInt(event.target.value));
    }

    const handleCustomPriceChange = (event) => {
        setPrice(parseInt(event.target.value));

        if (event.target.value === '')
            setPrice(0)
        else
            setPrice(parseInt(event.target.value));
    };

    const handleCancel = () => {
        const updatedMessage = message;
        setMessage("");
        setShowPopup(false);
        if (updatedMessage === "Service updated successfully") {
            window.location.href = '/services'
        }
    };

    return (
        <>
            <div style={{ color: '#C5C6C7' }} className='form' >
                <h1>Edit Service</h1>
                <form>
                    <div className='form-field'>
                        <div className='title-field'>
                            <label htmlFor='title' style={{ color: '#66FCF1' }} > Title </label>
                            <input
                                type='text'
                                id='title'
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-field'>
                        <div className='call-field'>
                            <label style={{ color: '#66FCF1' }}>Call duration</label>
                            <br />

                            <div className='call-options'>

                                <input type="radio" id="10mins" name="duration" value="10" onChange={handleDurationChange} />
                                <label htmlFor="10mins" style={{ marginTop: '17px' }}>10 mins</label>
                                <br />
                                <input type="radio" id="20mins" name="duration" value="20" onChange={handleDurationChange} />
                                <label htmlFor="20mins" style={{ marginTop: '17px' }}>20 mins</label>
                                <br />

                                <input type="radio" id="30mins" name="duration" value="30" onChange={handleDurationChange} />
                                <label htmlFor="30mins" style={{ marginTop: '17px' }}>30 mins</label>
                                <br />
                                <input type="radio" id="1hr" name="duration" value="60" onChange={handleDurationChange} />
                                <label htmlFor="1hr" style={{ marginTop: '17px' }}>1 hr</label>
                                <br />

                            </div>

                            <input type="radio" id="customCall" name="duration" value="custom" onChange={handleDurationChange} />
                            <label htmlFor="custom" style={{ marginTop: '17px' }}>Custom Duration</label>

                            {
                                customBool &&
                                <>
                                    <input type="number" id="customDuration" name="customDuration" min="1" max="1440" onChange={handleCustomDurationChange}
                                        placeholder='Time in minutes' style={{
                                            marginLeft: '30px', fontSize: '18px',
                                            color: '#C5C6C7', width: '40%'
                                        }} />
                                    <br />
                                </>
                            }
                            <p style={{ marginTop: '20px', fontSize: '20px', color: '#e7717d' }}>Selected duration: {customBool ? (duration === 0 ? 'Fix the slot' : duration + " mins") : duration === 0 ? 0 + " mins" : duration + " mins"}</p>
                        </div>
                    </div>


                    <div className='form-field'>
                        <div className='price-field'>
                            <label style={{ color: '#66FCF1' }}> Price </label>
                            <br />

                            <div className='call-options'>

                                <input type="radio" id="100price" name="price" value="100" onChange={handlePriceChange} />
                                <label htmlFor="100price" style={{ marginTop: '17px' }}>100 Rs</label>
                                <br />
                                <input type="radio" id="200price" name="price" value="200" onChange={handlePriceChange} />
                                <label htmlFor="200price" style={{ marginTop: '17px' }}>200 Rs</label>
                                <br />

                                <input type="radio" id="300price" name="price" value="300" onChange={handlePriceChange} />
                                <label htmlFor="300price" style={{ marginTop: '17px' }}>300 Rs</label>
                                <br />
                                <input type="radio" id="500price" name="price" value="500" onChange={handlePriceChange} />
                                <label htmlFor="500price" style={{ marginTop: '17px' }}>500 Rs</label>
                                <br />
                            </div>

                            <input type="radio" id="customPrice" name="price" value="custom" onChange={handlePriceChange} />
                            <label htmlFor="custom" style={{ marginTop: '17px' }}>Custom Price</label>

                            {
                                customPriceBool &&
                                <>
                                    <input type="number" id="customPrice" name="customPrice" onChange={handleCustomPriceChange}
                                        placeholder='Enter the amount' style={{
                                            marginLeft: '25px', fontSize: '18px',
                                            color: '#C5C6C7', width: '40%'
                                        }} />
                                    <br />
                                </>
                            }
                            <p style={{ marginTop: '20px', fontSize: '20px', color: '#e7717d' }}>Selected Price: {customPriceBool ? (price === 0 ? 'Free' : price + " Rs") : price === 0 ? "Free" : price + " Rs"}</p>
                        </div>
                    </div>
                    <div className='division' style={{ width: '100%', maxWidth: '600px', marginLeft: '10px', marginTop: '20px' }}></div>

                    <button className='submit-button' type='submit' onClick={handleSubmit}>Update</button>
                </form>
            </div>

            {
                showpopup && (message !== "") &&

                <Popup
                    message={message}
                    onCancel={handleCancel}
                    showConfirm={false}
                />
            }

        </>
    )
}

export default EditCallServiceForm