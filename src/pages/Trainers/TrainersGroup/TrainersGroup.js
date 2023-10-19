import React from 'react';
import './TrainersGroup.scss';

const TrainersGroup = ({ trainerListData }) => {
  return (
    <ul className="trainersWrap">
      {trainerListData?.map((trainer, index) => {
        return (
          <li className="trainerItem" key={index}>
            <div className="trainerImg">
              {trainer.thumbnail ? (
                <img src={trainer.thumbnail} alt="프로필 이미지" />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                  alt="프로필 이미지"
                />
              )}
            </div>
            <div className="trainerName">{trainer.title}</div>
            <div className="trainerInfo">
              <p className="infoHalf">
                <span className="bold">전공</span>: {trainer.category}
              </p>
              <div className="detailInfo">
                <p className="leftHalfWrap">
                  <span className="bold">가격</span>:&nbsp;
                  {trainer.price.toLocaleString()}
                </p>
                <p className="halfWrap">
                  <span className="bold">위치</span>: {trainer.brand}
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
