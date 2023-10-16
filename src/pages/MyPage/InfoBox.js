import React from 'react';

const InfoBox = props => {
  return (
    <div className={`infoBox ${props.class}`}>
      <p>{props.id}</p>
      <p>{props.value}</p>
    </div>
  );
};

export default InfoBox;
