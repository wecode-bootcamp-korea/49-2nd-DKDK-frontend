import React from 'react';
import './TrainersGroup.scss';

const TrainersGroup = ({ trainerListData, setIsDetail, setPostId }) => {
  const handlePostId = e => {
    const id = e.currentTarget.value;
    setPostId(id);
    setIsDetail(true);
  };

  return (
    <ul className="trainersWrap">
      {trainerListData.map((trainer, index) => {
        const { id, availableArea, categoryName, imgUrl, price } = trainer;
        return (
          <li
            className="trainerItem"
            key={index}
            value={id}
            onClick={e => {
              handlePostId(e);
            }}
          >
            <div className="trainerImg">
              {imgUrl ? (
                <img src={imgUrl} alt="프로필 이미지" />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                  alt="프로필 이미지"
                />
              )}
            </div>
            <div className="trainerName">{id}</div>
            <div className="trainerInfo">
              <p className="infoHalf">
                <span className="bold">전공</span>: {categoryName}
              </p>
              <div className="detailInfo">
                <p className="leftHalfWrap">
                  <span className="bold">가격</span>:&nbsp;
                  {price.toLocaleString()}
                </p>
                <p className="halfWrap">
                  <span className="bold">위치</span>: {availableArea}
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
