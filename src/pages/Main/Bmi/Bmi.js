import React, { useState } from 'react';
import './Bmi.scss';

const Bmi = () => {
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [name, setName] = useState('');
  const [alert, setAlert] = useState('');
  const [isClick, setIsClick] = useState(false);
  const Bmi = Number(((weight / (length * length)) * 10000).toFixed(1));

  const nowLength = e => {
    setLength(e.target.value);
    setIsClick(false);
  };

  const nowWeight = e => {
    setWeight(e.target.value);
    setIsClick(false);
  };

  const isOnBmi = () => {
    if (Bmi < 18.5) {
      setResult('저체중');
      setName('blue');
      setAlert('저체중입니다. 더 많은 음식을 섭취할 필요가 있습니다.');
    } else if (18.5 <= Bmi && Bmi <= 23) {
      setResult('정상');
      setName('green');
      setAlert(
        '정상입니다. 적절한 운동을 변행하여 더 건강한 몸을 만들어보세요.',
      );
    } else if (23 < Bmi && Bmi <= 25) {
      setResult('과체중');
      setName('yellow');
      setAlert('과체중입니다. 식습관 개선과, 운동이 필요합니다!');
    } else if (25 < Bmi) {
      setResult('비만');
      setName('red');
      setAlert('비만입니다! 식단과 운동이 필수적으로 필요합니다!');
    }
    setIsClick(true);
  };

  const reset = () => {
    setLength('');
    setWeight('');
    setResult('');
    setName('');
    setAlert('');
    setIsClick(false);
  };

  return (
    <section className={`bmi ${name}`}>
      <div className={`bmiContent ${name}`}>
        <h4>BMI: 나의 체질량지수</h4>
        <div className="alignWrap">
          <div className="bmiInputWrap">
            <form name="bmiCheckBox" className="bmiCheckBox">
              <div>
                <label htmlFor="length">신장</label>
                <input
                  type="text"
                  id="length"
                  value={length}
                  autoComplete="off"
                  onChange={nowLength}
                />
                <span>cm</span>
              </div>
              <div>
                <label htmlFor="weight">체중</label>
                <input
                  type="weight"
                  id="weight"
                  value={weight}
                  autoComplete="off"
                  onChange={nowWeight}
                />
                <span>kg</span>
              </div>
            </form>
            <div className="bottomWrap">
              <div className="resultWrap">
                <p className="result">
                  비만도 결과: &nbsp;{isClick && <span>{result}</span>}
                </p>
                <p className="resultBmi">
                  BMI 지수: &nbsp;{isClick && <span>{Bmi}</span>}
                </p>
              </div>
              <div className="btnWrap">
                <button type="button" className="calBtn" onClick={isOnBmi}>
                  계산하기
                </button>
                <button type="button" className="calBtn" onClick={reset}>
                  초기화
                </button>
              </div>
            </div>
          </div>
          <div className="bmiCheckBar">
            <ul className="bmiCheck">
              <li>
                <ul className="bmiNumber">
                  <li className="bmiName">BMI</li>
                  <li className="lowName">18.5</li>
                  <li className="regularName">23</li>
                  <li className="overName">25</li>
                </ul>
              </li>
              <li>
                <ul className="bmiColorBar">
                  <li className="low">저체중</li>
                  <li className="regular">정상</li>
                  <li className="over">과체중</li>
                  <li className="obesity">비만</li>
                </ul>
              </li>
            </ul>
            <div className={`alertBmi ${name}`}>
              <p>{alert}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bmi;
