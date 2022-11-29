import React from 'react';

const HappyBuyer = () => {
    return (
        <div className='bg-primary p-10 rounded-lg my-10'>
            <h2 className='text-3xl font-bold text-center'>Happy Buyer Around The Country</h2>
            <div className='grid lg:grid-cols-3 justify-items-center'>
                <div className="card w-96 glass my-10">

                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://i.ibb.co/44HV14Y/julian-mcauley.jpg" alt='avatar' />
                            </div>
                        </div>
                        <div className='ml-10 grid justify-items-center '>
                            <p className='font-bold'>Tom Jon</p>
                            <p>I am really happy!</p>
                        </div>
                    </div>
                </div>
                <div className="card w-96 glass my-10">

                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://i.ibb.co/6WqKk2X/ilkay-altintas.jpg" alt='avatar' />
                            </div>
                        </div>
                        <div className='ml-10 grid justify-items-center '>
                            <p className='font-bold'>Liza</p>
                            <p>Great site to buy used phone.</p>
                        </div>
                    </div>
                </div>
                <div className="card w-96 glass my-10">

                    <div className="flex items-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://i.ibb.co/c6sgKqV/daniel.jpg" alt='avatar' />
                            </div>
                        </div>
                        <div className='ml-10 grid justify-items-center '>
                            <p className='font-bold'>James</p>
                            <p>Trusted seller, I am really happy!</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default HappyBuyer;