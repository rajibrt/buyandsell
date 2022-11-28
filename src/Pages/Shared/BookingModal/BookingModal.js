import React from 'react';

const BookingModal = ({ bookedMobile }) => {

    const { brand, condition, location, mobileno, model, salesPrice, originalPrice, postDate, purchasesDate, image, description } = bookedMobile;
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold">Brand: {brand}</h3>
                    <h3 className="text-lg font-bold">Model: {model}</h3>
                    <p className="py-4">You have pay: ${salesPrice}</p>
                </div>
            </div>

        </div>
    );
};

export default BookingModal;