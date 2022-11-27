import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PhoneCard from './PhoneCard';

const SingleBrand = () => {
    const brand = useLoaderData();
    // const url = `http://localhost:4000/brandcollection?brand=${brand?.id}`;
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
            <h2>This is category page</h2>
            <div className='grid grid-cols-4 gap-4'>
                {
                    brand.map(m => <PhoneCard
                        key={m._id}
                        m={m}
                    ></PhoneCard>)
                }
            </div>
        </div>
    );
};

export default SingleBrand;