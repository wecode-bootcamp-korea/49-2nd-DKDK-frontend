import React from 'react';
import Banner from './Banner/Banner';
import SubBannerNav from './SubBannerNav/SubBannerNav';
import SubBanner from './SubBanner/SubBanner';
import Bmi from './Bmi/Bmi';
import Kcal from './Kcal/Kcal';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <Banner />
      <SubBannerNav />
      <SubBanner />
      <Bmi />
      <Kcal />
    </div>
  );
};

export default Main;
