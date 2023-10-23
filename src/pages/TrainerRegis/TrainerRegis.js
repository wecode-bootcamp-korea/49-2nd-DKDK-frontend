import React, { useState } from 'react';
import './TrainerRegis.scss';

const TrainerRegis = () => {
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [period, setPeriod] = useState('');
  const [text, setText] = useState('');

  const handlePlace = e => {
    const target = e.target.value;
    setPlace(target);
  };

  const handlePrice = e => {
    const target = e.target.value;
    setPrice(target);
  };

  const handleTime = e => {
    const target = e.target.value;
    setTime(target);
  };

  const handlePeriod = e => {
    const target = e.target.value;
    setPeriod(target);
  };

  const handleText = e => {
    const target = e.target.value;
    setText(target);
  };

  return (
    <div className="trainerRegisWrap">
      <div className="trainerRegis">
        <div className="contentsWrap">
          <button type="button" className="closeBtn">
            닫기
          </button>
          <section className="profileWrap">
            <div className="profileInfoWrap">
              <div className="profileImgWrap">
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                />
              </div>
              <p className="profileName">득근득근</p>
            </div>
            <div className="inputInfoWrap">
              <div className="inputNameWrap">
                <div className="inputName">상세 정보 입력</div>
              </div>
              <form className="inputInfo">
                <div className="infoLeftWrap">
                  <div className="regisInput">
                    <label htmlFor="region" className="regisName">
                      가능 지역
                    </label>
                    <input
                      type="text"
                      id="region"
                      placeholder="가능한 지역을 입력해주세요."
                      onChange={handlePlace}
                    />
                  </div>
                  <div className="regisInput">
                    <label htmlFor="cost" className="regisName">
                      가격
                    </label>
                    <input
                      type="number"
                      id="cost"
                      placeholder="희망하는 가격을 입력해주세요."
                      onChange={handlePrice}
                    />
                  </div>
                  <div className="regisInput">
                    <label htmlFor="time" className="regisName">
                      가능 시간
                    </label>
                    <input
                      type="text"
                      id="time"
                      placeholder="가능한 시간을 입력해주세요."
                      onChange={handleTime}
                    />
                  </div>
                </div>
                <div className="infoRightWrap">
                  <div className="selectWrap">
                    <p className="selectName">기간 선택</p>
                    <select className="selectOption" onChange={handlePeriod}>
                      <option selected disabled hidden>
                        기간 선택
                      </option>
                      <option value="1">1개월</option>
                      <option value="2">2개월</option>
                      <option value="3">3개월</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <section className="prInputWrap">
            <div className="prImgInputWrap">
              <div className="prImgPreview">
                <img src={process.env.PUBLIC_URL + '/images/logo_white.png'} />
              </div>
              <input type="file" accept="image/*" className="imgUpload" />
            </div>
            <div className="prTextInputWrap">
              <p className="textInputName">글을 입력해주세요</p>
              <div className="textWarp">
                <textarea
                  className="textInput"
                  placeholder="글을 입력해주세요."
                  onChange={handleText}
                />
              </div>
            </div>
          </section>
          <div className="bottomBtnWrap">
            <button type="button" className="goPayBottomBtn">
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerRegis;
