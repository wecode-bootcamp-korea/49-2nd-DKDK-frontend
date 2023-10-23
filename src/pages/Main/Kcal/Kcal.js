import React, { useState } from 'react';
import '../../../data/FOOD_KCAL';
import './Kcal.scss';
import FOOD_KCAL from '../../../data/FOOD_KCAL';

const Kcal = () => {
  const [checkedList, setCheckedList] = useState([]);

  const onCheckedList = (checked, kcal) => {
    if (checked) {
      setCheckedList(prev => [...prev, kcal]);
    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== kcal));
    }
  };

  const kcalSum = checkedList.reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  const reset = () => {
    setCheckedList([]);
    document.getElementById('kcalCheck').reset();
  };

  return (
    <section className="kcal">
      <div className="kcalContent">
        <div className="topWrap">
          <h4>Kcal: 나의 칼로리</h4>
          <div>
            <button type="button" className="kcalBtn" onClick={reset}>
              초기화
            </button>
            <button type="button" className="kcalBtn">
              계산하기
            </button>
          </div>
        </div>
        <form id="kcalCheck">
          {FOOD_KCAL.map(food => {
            const { id, food_name, kcal } = food;
            return (
              <label key={id}>
                <input
                  type="checkbox"
                  name="kcal"
                  onChange={e => {
                    onCheckedList(e.target.checked, kcal);
                  }}
                />
                &nbsp;{food_name}
              </label>
            );
          })}
        </form>
        <div className="kcalResultWrap">
          칼로리:
          <span className="kcalResult">{kcalSum}kcal</span>
        </div>
      </div>
    </section>
  );
};

export default Kcal;
