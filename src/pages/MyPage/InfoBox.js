import React from 'react';
import './InfoBox.scss';
const InfoBox = ({ id, value, setDisplay }) => {
  return (
    <div className={setDisplay ? 'infoBox ' + setDisplay : 'infoBox'}>
      <p className="infoKey">{id}</p>
      <p className="infoValue">{value}</p>
    </div>
  );
};

export default InfoBox;
