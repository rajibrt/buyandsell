import React from 'react';

const PhoneCard = ({ m }) => {
    const { brand, image, name, postDate } = m;
    console.log(m);
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{brand}</p>
                    <p>{postDate}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneCard;