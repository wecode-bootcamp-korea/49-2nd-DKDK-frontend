import React, { useState, useRef } from 'react';
import Input from '../Signup/components/Input/Input';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './ModiInfo.scss';

const ModiInfo = () => {
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(new Date());
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const saveImgFile = () => {
    console.log(imgRef);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleInput = e => {
    const { name, value, type } = e.target;

    if (name === 'phoneNumber') {
      const value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/([0-9]{3})([0-9]{3,4})([0-9]{4})/g, '$1-$2-$3');
      e.target.value = value;
    } else if (type === 'number') {
      const value = e.target.value.replace(/[^0-9.]/g, '');
      e.target.value = value;
    }
    setUserData(pre => {
      return { ...pre, [name]: value };
    });
  };

  const handleDate = data => {
    setDate(data);
    data = new Date(data);
    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const date = data.getDate();
    data = year + '-' + month + '-' + date;
    setUserData(pre => {
      return { ...pre, birthday: data };
    });
  };

  const goSignUp = () => {
    console.log(userData);
  };

  const checkAllWrite =
    userData.height &&
    userData.phoneNumber &&
    userData.weight &&
    userData.interestedWorkout &&
    userData.workoutLoad &&
    (userData.userType === '1' || userData.specialized);
  console.log(userData);
  return (
    <div className="modiInfo contentsWrap">
      <div className="container">
        <p className="title">
          내 정보 수정
          {userData.userType === '1' ? (
            <span>{userData.nickName} 님(일반인)</span>
          ) : (
            <span>{userData.nickName} 님(트레이너)</span>
          )}
        </p>
        <div className="imgWrap">
          <div className="imgPreviewWrap">
            <label className="imgLabel" htmlFor="profileImg">
              {imgFile ? (
                <img src={imgFile} />
              ) : (
                <img src="/images/logo_white.png" />
              )}
              <span>수정</span>
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
        <Input
          lable="전화번호(-생략)"
          type="tel"
          width="w100"
          name="phoneNumber"
          onChange={handleInput}
          maxLength={13}
          userData={userData}
        />
        <div className="genderWrap">
          <label>
            <input
              type="radio"
              name="gender"
              value="남성"
              defaultChecked
              onChange={e => handleInput(e)}
            />
            <span>남성</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="여성"
              onChange={e => handleInput(e)}
            />
            <span>여성</span>
          </label>
          <span className="selection"></span>
        </div>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
          selected={date}
          onChange={date => handleDate(date)}
          className="datepicker"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <Input
          lable="키(cm)"
          type="number"
          width="w50"
          name="height"
          useSecond={true}
          secondLable="몸무게(kg)"
          secondName="weight"
          onChange={handleInput}
          userData={userData}
        />
        <div className="selectWrap">
          <select
            name="interestedWorkout"
            defaultValue=""
            onChange={handleInput}
          >
            <option value="">관심운동</option>
            <option value="1">헬스</option>
            <option value="2">필라테스</option>
            <option value="3">요가</option>
          </select>
        </div>
        <div className="selectWrap">
          <select name="workoutLoad" defaultValue="" onChange={handleInput}>
            <option value="">운동강도</option>
            <option value="1">상(60분 ~ )</option>
            <option value="2">중(30분 ~ 60분)</option>
            <option value="3">하(~ 30분)</option>
          </select>
        </div>
        {userData.userType === '2' && (
          <div className="selectWrap">
            <select name="specialized" defaultValue="" onChange={handleInput}>
              <option value="">전문운동종목(트레이너)</option>
              <option value="1">헬스</option>
              <option value="2">필라테스</option>
              <option value="3">요가</option>
            </select>
          </div>
        )}
        <div className="signupBtnWrap">
          <button
            className="signupBtn"
            onClick={goSignUp}
            disabled={!checkAllWrite}
          >
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModiInfo;
