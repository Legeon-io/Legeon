import React from 'react'

const ServiceTypeCard = (title) => {
    return (
        <>
            <div className="editable-input-buttons">
                <button className="editable-input-button" onClick={handleSaveClick}>{title}</button>
            </div>
        </>
    )
}

export default ServiceTypeCard