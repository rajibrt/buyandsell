import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero h-[450px]" style={{ backgroundImage: `url("https://i.ibb.co/fNxXMsD/hero-home.webp")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
                    <p className="mb-5 text-white">Get the right price for your used phone</p>
                    <Link to='/submitmobile' className="btn btn-primary bg-base-100">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;