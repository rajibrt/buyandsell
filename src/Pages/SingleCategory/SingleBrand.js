import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Shared/BookingModal/BookingModal';
import PhoneCard from './PhoneCard';

const SingleBrand = () => {
    const [bookedMobile, setBookedMobile] = useState(null);
    const brand = useLoaderData();
    console.log(brand);
    // const url = `https://buynsell-server.vercel.app/brandcollection?brand=${brand?.id}`;
    // console.log(brand?.id);
    // const { data: brandcollection = [] } = useQuery({
    //     queryKey: ['brand', brand?.id],
    //     queryFn: async () => {
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         return data;
    //     }

    // })
    return (
        <div>
            <h2 className='text-xl text-center'>Please chose your desire mobile and booked now</h2>
            <div className="divider"></div>

            <div className='grid xl:grid-cols-4 gap-4 grid-flow-col-1 my-4'>
                {
                    brand.map(m => <PhoneCard
                        key={m._id}
                        m={m}
                        setBookedMobile={setBookedMobile}
                    ></PhoneCard>)
                }
            </div>

            {bookedMobile &&
                <BookingModal
                    bookedMobile={bookedMobile}
                    setBookedMobile={setBookedMobile}
                ></BookingModal>
            }

        </div>
    );
};

export default SingleBrand;