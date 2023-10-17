import React from 'react';
import './TrainersGroup.scss';

const TrainersGroup = ({ trainerListData }) => {
  return (
    <ul className="trainersWrap">
      {trainerListData?.map((trainer, index) => {
        return (
          <li className="trainerItem" key={index}>
            <div className="trainerImg">
              <img
                src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                alt="프로필 이미지"
              />
            </div>
            <div className="trainerName">{trainer.user_name}</div>
            <div className="trainerInfo">
              <p className="infoHalf">
                <span className="bold">전공</span>: {trainer.major}
              </p>
              <div className="detailInfo">
                <p className="leftHalfWrap">
                  <span className="bold">가격</span>
                  {`: ${trainer.price.toLocaleString()}`}
                </p>
                <p className="halfWrap">
                  <span className="bold">위치</span>: {trainer.available_area}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TrainersGroup;
