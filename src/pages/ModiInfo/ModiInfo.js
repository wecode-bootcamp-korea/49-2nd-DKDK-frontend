import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../Signup/components/Input/Input';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './ModiInfo.scss';

const ModiInfo = () => {
  const [userData, setUserData] = useState({});
  const [date, setDate] = useState(new Date());
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const userType = localStorage.getItem('userType');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEST_API}/userHealthInfo/get`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        if (res.data.message === 'MODIFYING_USER_INFO_LOADED') {
          setUserData(res.data.data[0]);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
      setUserData(pre => ({
        ...pre,
        image: file,
      }));
    }
  };

  const handleInput = e => {
    const { name, value, type } = e.target;

    if (type === 'number') {
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
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    axios
      .post(`${process.env.REACT_APP_TEST_API}/userHealthInfo`, formData, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        if (res.data.message === 'USER_INFO_UPDATED') {
          alert('회원 정보가 수정되었습니다.');
          navigate('/my-page');
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  };
  console.log(userData);
  return (
    <div className="modiInfo contentsWrap">
      <div className="container">
        <p className="title">
          내 정보 수정
          {userType === '1' ? (
            <span>{userData.nickname} 님(일반인)</span>
          ) : (
            <span>{userData.nickname} 님(트레이너)</span>
          )}
        </p>
        <div className="imgWrap">
          <div className="imgPreviewWrap">
            <label className="imgLabel" htmlFor="image">
              {imgFile ? (
                <img src={imgFile} alt="프로필 이미지" />
              ) : (
                <img
                  src={
                    userData.imgUrl ? userData.imgUrl : '/images/logo_white.png'
                  }
                  alt="기본 이미지"
                />
              )}
              <span>수정</span>
            </label>
            <input
              className="imgInput"
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </div>
        </div>

        <div className="genderWrap">
          <label>
            <input
              type="radio"
              name="gender"
              value={1}
              checked={userData.gender == '1'}
              onChange={e => handleInput(e)}
            />
            <span>남성</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value={2}
              checked={userData.gender == '2'}
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
          selected={userData.birthday ? new Date(userData.birthday) : date}
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
          defaultValue={userData.height}
          secondDefaultValue={userData.weight}
        />
        <div className="selectWrap">
          <select
            name="interestedWorkout"
            value={userData.interestedWorkout}
            onChange={handleInput}
          >
            <option value="">관심운동</option>
            <option value={1}>헬스</option>
            <option value={2}>필라테스</option>
            <option value={3}>요가</option>
          </select>
        </div>
        <div className="selectWrap">
          <select
            name="workoutLoad"
            value={userData.workoutLoad}
            onChange={handleInput}
          >
            <option value="">운동강도</option>
            <option value={1}>상(60분 ~ )</option>
            <option value={2}>중(30분 ~ 60분)</option>
            <option value={3}>하(~ 30분)</option>
          </select>
        </div>
        {userData.userType === '2' && (
          <div className="selectWrap">
            <select
              name="specialized"
              defaultValue={userData.specialized}
              onChange={handleInput}
            >
              <option value="">전문운동종목(트레이너)</option>
              <option value={1}>헬스</option>
              <option value={2}>필라테스</option>
              <option value={3}>요가</option>
            </select>
          </div>
        )}
        <div className="signupBtnWrap">
          <button className="signupBtn" onClick={goSignUp}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModiInfo;
