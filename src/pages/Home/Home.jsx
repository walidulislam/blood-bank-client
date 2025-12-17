import React from 'react';
import Banner from '../../component/Banner/Banner';
import FeaturedSection from '../../component/FeaturedSection/FeaturedSection';
import ContactUs from '../../component/ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;