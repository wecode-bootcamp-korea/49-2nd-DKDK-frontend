import React from 'react';
import './SelectBox.scss';

const OPTION_LIST = [
  { id: 1, name: '등록 순' },
  { id: 2, name: '회원수 순' },
  { id: 3, name: '활동 순' },
  { id: 4, name: '가격 순' },
];

const SPORT_LIST = [
  { id: 1, name: '전체' },
  { id: 2, name: '헬스' },
  { id: 3, name: '필라테스' },
  { id: 4, name: '요가' },
];
const SelectBox = ({ type, handleOption }) => {
  return (
    <select className="selectBox" onChange={handleOption}>
      <option value="" disabled selected hidden>
        {type === '옵션' ? '옵션 선택' : '운동 선택'}
      </option>
      {type === '옵션'
        ? OPTION_LIST.map(option => {
            return <option key={option.id}>{option.name}</option>;
          })
        : SPORT_LIST.map(sport => {
            return <option key={sport.id}>{sport.name}</option>;
          })}
    </select>
  );
};

export default SelectBox;
