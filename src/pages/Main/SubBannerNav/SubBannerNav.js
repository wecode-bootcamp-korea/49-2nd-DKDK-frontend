import React from 'react';
import './SubBannerNav.scss';

const SubBannerNav = ({ moveToBmi, moveToKcal }) => {
  return (
    <div className="contentsWrap">
      <div className="subBanner">
        <div className="goToBMI">
          <div className="BMICenterWrap">
            <h3>CHECK YOUR BODY</h3>
            <p className="contentText">
              현재 나의 BMI는 얼마일까? <br />
              BMI를 계산해드립니다.
            </p>
            <button type="button" className="goContentBtn" onClick={moveToBmi}>
              나의 BMI
            </button>
          </div>
        </div>
        <div className="goToKcal">
          <div className="kcalCenterWrap">
            <h3>CHECK YOUR TODAY'S Kcal</h3>
            <p className="whiteFont">
              내가 먹은 음식, kcal는? <br />
              kcal를 계산해드립니다.
            </p>
            <button type="button" className="goContentBtn" onClick={moveToKcal}>
              오늘의 Kcal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBannerNav;
