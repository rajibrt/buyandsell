import React from 'react';
import Category from './Category/Category';
import HappyBuyer from './HappyBuyer/HappyBuyer';
import Hero from './Hero/Hero';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Category></Category>
            <HappyBuyer></HappyBuyer>
        </div>
    );
};

export default Home;