import React from 'react';
import './InfoBox.scss';
const InfoBox = ({ id, value, setClass }) => {
  return (
    <div className={`infoBox ${setClass && setClass}`}>
      <p className="infoKey">{id}</p>
      <p className="infoValue">{value}</p>
    </div>
  );
};

export default InfoBox;
