import React, { useState } from 'react';
import './ServiceForm.css';

const ServiceForm = () => {

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);

    const [customBool, setCustomBool] = useState(false);
    const [customPriceBool, setCustomPriceBool] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, duration, price)
    }

    const handleDurationChange = (event) => {
        if (event.target.id === 'customCall')
            setCustomBool(true);
        else
            setCustomBool(false);

        setDuration(parseInt(event.target.value));
    };

    const handleCustomDurationChange = (event) => {
        setDuration(parseInt(event.target.value));
    };
    
    const handlePriceChange = (event) => {
        if (event.target.id === 'customPrice')
        setCustomPriceBool(true);
        else
        setCustomPriceBool(false);
        
        setPrice(parseInt(event.target.value));
    }
    
    const handleCustomPriceChange = (event) => {
        setPrice(parseInt(event.target.value));
    };

    return (
        <>
            <div style={{ color: '#C5C6C7' }} className='form' >
                <form>
                    <div className='form-field'>
                        <div className='title-field'>
                            <label htmlFor='title' style={{ color: '#C5C6C7' }} > Title </label>
                            <input
                                type='text'
                                id='title'
                                placeholder='Service Name'
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='form-field'>
                        <div className='call-field'>
                            <label>Call duration</label>
                            <br />
                            <input type="radio" id="10mins" name="duration" value="10" onChange={handleDurationChange} />
                            <label htmlFor="10mins">10 mins</label>
                            <br />
                            <input type="radio" id="20mins" name="duration" value="20" onChange={handleDurationChange} />
                            <label htmlFor="20mins">20 mins</label>
                            <br />
                            <input type="radio" id="30mins" name="duration" value="30" onChange={handleDurationChange} />
                            <label htmlFor="30mins">30 mins</label>
                            <br />
                            <input type="radio" id="1hr" name="duration" value="60" onChange={handleDurationChange} />
                            <label htmlFor="1hr">1 hr</label>
                            <br />
                            <input type="radio" id="customCall" name="duration" value="custom" onChange={handleDurationChange} />
                            <label htmlFor="custom">Custom Call</label>

                            {
                                !customBool &&
                                <>
                                    <input type="number" id="customDuration" name="customDuration" min="1" max="1440" value='0' onChange={handleCustomDurationChange} disabled /> mins
                                    <br />
                                </>
                            }

                            {
                                customBool &&
                                <>
                                    <input type="number" id="customDuration" name="customDuration" min="1" max="1440" onChange={handleCustomDurationChange} /> mins
                                    <br />
                                </>
                            }
                            <p>Selected duration: {duration === "customDuration" ? duration + " mins" : duration === 0 ? "" : duration + " mins"}</p>
                        </div>
                    </div>


                    <div className='form-field'>
                        <div className='price-field'>
                            <label> Price </label>
                            <br />
                            <input type="radio" id="100price" name="price" value="100" onChange={handlePriceChange} />
                            <label htmlFor="100price">100 Rs</label>
                            <br />
                            <input type="radio" id="200price" name="price" value="200" onChange={handlePriceChange} />
                            <label htmlFor="200price">200 Rs</label>
                            <br />
                            <input type="radio" id="300price" name="price" value="300" onChange={handlePriceChange} />
                            <label htmlFor="300price">300 Rs</label>
                            <br />
                            <input type="radio" id="500price" name="price" value="500" onChange={handlePriceChange} />
                            <label htmlFor="500price">500 Rs</label>
                            <br />
                            <input type="radio" id="customPrice" name="price" value="custom" onChange={handlePriceChange} />
                            <label htmlFor="custom">Custom Price</label>

                            {
                                !customPriceBool &&
                                <>
                                    <input type="number" id="customPrice" name="customPrice" value='0' onChange={handleCustomPriceChange} disabled /> Rs
                                    <br />
                                </>
                            }

                            {
                                customPriceBool &&
                                <>
                                    <input type="number" id="customPrice" name="customPrice" onChange={handleCustomPriceChange} /> Rs
                                    <br />
                                </>
                            }
                            <p>Selected Price: {duration === "customPrice" ? price + " Rs" : price === 0 ? "" : price + " Rs"}</p>
                        </div>
                    </div>

                    <button className='submit-button' type='submit' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default ServiceForm