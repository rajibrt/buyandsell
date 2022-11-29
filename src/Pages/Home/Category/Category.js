import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
    const [mobileCategory, setMobileCategory] = useState([]);
    useEffect(() => {
        fetch('https://buynsell-server.vercel.app/category')
            .then(res => res.json())
            .then(data => setMobileCategory(data))
    }, [])

    return (
        <div className="my-10 lg:mx-0 mx-4">
            <h2 className="text-center text-3xl mb-4">Which brand do you want?</h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 justify-items-center">
                {
                    mobileCategory.map(card => <CategoryCard
                        key={card._id}
                        card={card}
                        mobileCategory={mobileCategory}
                    ></CategoryCard>)
                }

            </div>
        </div>
    );
};

export default Category;