import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ bookedMobile, setBookedMobile }) => {
    const { user } = useContext(AuthContext);
    const { _id, brand, condition, location, mobileno, model, salesPrice, originalPrice, postDate, purchasesDate, image, description } = bookedMobile;

    const bookedDate = format(new Date(), 'PPpp');


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const brand = form.brand.value;
        const model = form.model.value;
        const salesPrice = form.salesPrice.value;
        const buyerName = form.buyerName.value;
        const buyer = form.buyerEmail.value;
        const buyerPhoneNo = form.buyerPhoneNo.value;
        const meetLocation = form.meetLocation.value;
        const booking = {
            productId: _id,
            bookedDate: bookedDate,
            image: image,
            brand,
            model,
            salesPrice,
            buyerName,
            buyer,
            buyerPhoneNo,
            meetLocation
        }

        fetch('http://localhost:4000/bookedMobile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setBookedMobile(null);
                    <div>
                        {toast.success(`${bookedMobile.model} is booked successfully`)}
                        < Toaster />
                    </div>
                }
                else {
                    toast.error(data.message);
                }
            })

        setBookedMobile(null);
    }


    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">You are going to booked {model}</h3>
                    <form onSubmit={handleBooking} className='grid grid-flow-col-1 gap-4'>
                        <div>
                            <label className="label">
                                <span className="label-text">Brand</span>
                            </label>
                            <input type="text" name="brand" readOnly defaultValue={brand} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Model</span>
                            </label>
                            <input type="text" name="model" readOnly defaultValue={model} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">You have to pay</span>
                            </label>
                            <input type="text" name="salesPrice" readOnly defaultValue={salesPrice} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" name="buyerName" readOnly defaultValue={user.displayName} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type="text" name="buyerEmail" readOnly defaultValue={user.email} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Your Phone No</span>
                            </label>
                            <input type="text" name="buyerPhoneNo" placeholder="Provide your phone number" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Where you want to meet?</span>
                            </label>
                            <input type="text" name="meetLocation" placeholder="Where you want to meet?" className="input input-bordered w-full" required />
                        </div>

                        <input className='btn w-full btn-primary mt-4' type="submit" value="Confirm Booking" />
                    </form>
                </div>
            </div>

        </div>
    );
};

export default BookingModal;