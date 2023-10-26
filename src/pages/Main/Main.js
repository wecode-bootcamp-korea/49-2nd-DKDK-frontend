import React, { useRef } from 'react';
import Banner from './Banner/Banner';
import SubBannerNav from './SubBannerNav/SubBannerNav';
import SubBanner from './SubBanner/SubBanner';
import Bmi from './Bmi/Bmi';
import Kcal from './Kcal/Kcal';
import './Main.scss';

const Main = () => {
  const bmiRef = useRef();
  const kcalRef = useRef();
  const moveContents = elementRef => {
    const moveToContent = () => {
      elementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    return moveToContent;
  };
  const moveToBmi = moveContents(bmiRef);
  const moveToKcal = moveContents(kcalRef);
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="main">
      <Banner />
      <SubBannerNav moveToBmi={moveToBmi} moveToKcal={moveToKcal} />
      <SubBanner />
      <div ref={bmiRef}>
        <Bmi />
      </div>
      <div ref={kcalRef}>
        <Kcal />
      </div>
      <button type="button" className="top" onClick={goTop}>
        TOP
      </button>
    </div>
  );
};

export default Main;
