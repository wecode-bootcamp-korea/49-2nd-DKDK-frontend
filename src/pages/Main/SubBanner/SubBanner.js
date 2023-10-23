import React from 'react';
import './SubBanner.scss';

const SubBanner = () => {
  return (
    <section className="subBannerWrap">
      <div className="leftBannerWrap">
        <img
          src={process.env.PUBLIC_URL + '/images/sub_banner.jpg'}
          alt="서브 배너"
        />
      </div>
      <div className="rightBannerWrap">
        <div className="topImgWrap">
          <img
            src={process.env.PUBLIC_URL + '/images/sub_banner2.jpg'}
            alt="서브 배너"
          />
        </div>
        <div className="bottomImgWrap">
          <img
            src={process.env.PUBLIC_URL + '/images/sub_banner3.jpg'}
            alt="서브 배너"
          />
        </div>
      </div>
    </section>
  );
};

export default SubBanner;
