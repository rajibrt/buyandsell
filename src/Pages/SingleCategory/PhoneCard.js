import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';

const PhoneCard = ({ m, setBookedMobile }) => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState(false);
    const { seller, brand, sellerName, condition, location, mobileno, model, salesPrice, originalPrice, postDate, purchasesDate, image, description } = m;

    const { data: booked, isLoading, refetch } = useQuery({
        queryKey: ['booked'],
        queryFn: async () => {
            try {
                const res = await fetch('https://buynsell-server.vercel.app/allmobile', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });


    const { data: sellers } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://buynsell-server.vercel.app/allusers?email=${seller}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                console.log('Status', data[0].status);
                setStatus(data[0].status)
            }
            catch (error) {

            }
        }
    });


    if (isLoading) {
        return <loading></loading>
    }

    // const handleBookMobile = mobile => {
    //     fetch('https://buynsell-server.vercel.app/bookedMobile', {
    //         method: 'POST',
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 refetch();
    //                 toast.success(`${booked.model} Booked successfully`)
    //             }
    //         })
    // }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <h2 className='flex items-center justify-center mt-2'>Seller: {sellerName} {
                    status &&
                    <FaCheckCircle className='text-blue-600 text-lg ml-2'></FaCheckCircle>
                }</h2>
                <div className="divider"></div>
                <div className="card-body">
                    <h2 className="card-title">Brand: {brand}</h2>
                    <p>Model: {model}</p>
                    <p>Condition: {condition}</p>
                    <p>Original Price: ${originalPrice}</p>
                    <p>Sales Price: ${salesPrice}</p>
                    <p>Purchases Date: {purchasesDate}</p>
                    <p>Posted On: {postDate}</p>
                    <p className="text-primary">Description: {description}</p>
                    <p>Mobile: {mobileno}</p>
                    <p>Location: {location}</p>
                    <div className="card-actions justify-end">
                        {/* <button className="btn w-full btn-primary">Book Now</button> */}
                        <label onClick={() => setBookedMobile(m)} htmlFor="booking-modal" className="btn w-full btn-primary">Book Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneCard;