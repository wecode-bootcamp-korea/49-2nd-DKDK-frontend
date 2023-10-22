import React from 'react';
import './Bmi.scss';

const Bmi = () => {
  return (
    <section className="bmi">
      <div className="bmiContent">
        <h4>BMI: 나의 체질량지수</h4>
        <div className="alignWrap">
          <div className="bmiInputWrap">
            <form name="bmiCheckBox" className="bmiCheckBox">
              <div>
                <label htmlFor="length">신장</label>
                <input type="text" id="length" name="length" />
                <span>cm</span>
              </div>
              <div>
                <label htmlFor="weight">체중</label>
                <input type="weight" id="weight" name="weight" />
                <span>kg</span>
              </div>
            </form>
            <div className="bottomWrap">
              <div className="resultWrap">
                <p className="result">
                  비만도 결과: &nbsp;<span>정상</span>
                </p>
                <p className="resultBmi">
                  BMI 지수: &nbsp;<span>21</span>
                </p>
              </div>
              <div className="btnWrap">
                <button type="button" className="calBtn">
                  계산하기
                </button>
                <button type="button" className="calBtn">
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
            <div className="alertBmi">
              <p>운동이 필요합니다!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bmi;
