import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleMobile = () => {
    const singleBrand = useLoaderData()
    return (
        <div>
            <h2>This is single mobile page</h2>

            {
                singleBrand.map(brand =>
                    <h2>test</h2>
                )
            }
        </div>
    );
};

export default SingleMobile;