import React, { useState, useRef } from 'react';
import './TrainerRegis.scss';

const TrainerRegis = () => {
  const [form, setForm] = useState({
    place: '',
    price: '',
    time: '',
    period: '',
    text: '',
    img: '',
  });
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setForm(prev => ({ ...prev, img: reader.result }));
    };
  };

  const handleForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // const allInputCheck =
  //   form.place &&
  //   form.price &&
  //   form.time &&
  //   form.period &&
  //   form.text &&
  //   form.img;

  // console.log(allInputCheck);
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
                      onChange={e => handleForm('place', e.target.value)}
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
                      onChange={e => handleForm('price', e.target.value)}
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
                      onChange={e => handleForm('time', e.target.value)}
                    />
                  </div>
                </div>
                <div className="infoRightWrap">
                  <div className="selectWrap">
                    <p className="selectName">기간 선택</p>
                    <select
                      className="selectOption"
                      onChange={e => handleForm('period', e.target.value)}
                    >
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
                <label className="imgLabel" htmlFor="profileImg">
                  {imgFile ? (
                    <img src={imgFile} alt="등록한이미지 미리보기" />
                  ) : (
                    <img src="/images/logo_white.png" alt="기본이미지" />
                  )}
                </label>
                <input
                  className="imgInput"
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
              </div>
            </div>
            <div className="prTextInputWrap">
              <p className="textInputName">글을 입력해주세요</p>
              <div className="textWarp">
                <textarea
                  className="textInput"
                  placeholder="글을 입력해주세요."
                  onChange={e => handleForm('text', e.target.value)}
                />
              </div>
            </div>
          </section>
          <div className="bottomBtnWrap">
            <button
              type="submit"
              className="goPayBottomBtn"
              disabled={!allInputCheck}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerRegis;
