import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PhoneCard from './PhoneCard';

const SingleBrand = () => {
    const brand = useLoaderData();
    const url = `http://localhost:4000/brandcollection?brand=${brand.brand}`;

    const { data: brandcollection = [] } = useQuery({
        queryKey: ['brand', brand?.brand],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }

    })
    return (
        <div>
            <h2>This is category page</h2>
            <div className='grid grid-cols-4 gap-4'>
                {
                    brandcollection.map(m => <PhoneCard
                        key={m._id}
                        m={m}
                    ></PhoneCard>)
                }
            </div>
        </div>
    );
};

export default SingleBrand;