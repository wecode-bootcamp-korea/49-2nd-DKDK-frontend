import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './components/Input/Input';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './Signup.scss';
import axios from 'axios';

const Signup = () => {
  const [date, setDate] = useState(new Date());

  let nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  nowDate = nowYear + '-' + nowMonth + '-' + nowDay;

  const [userData, setUserData] = useState({
    gender: '남성',
    userType: '1',
    birthday: nowDate,
  });

  const [checkNickName, setCheckNickName] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      localStorage.removeItem('newUserToken');
    };
  }, []);

  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const value = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = value;
      setUserData(pre => {
        return { ...pre, [name]: value };
      });
    } else {
      setUserData(pre => {
        return { ...pre, [name]: value };
      });
    }
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

  const handleCheckNickName = () => {
    setCheckNickName(true);
  };

  const goSignUp = () => {
    const phoneNumberRegex = /^01[016-9]\d{3,4}\d{4}$/;

    if (Math.sign(userData.weight) === -1) {
      alert('몸무게 값을 확인해주세요.');
    } else if (Math.sign(userData.height) === -1) {
      alert('키 값을 확인해주세요.');
    } else if (!phoneNumberRegex.test(userData.phoneNumber)) {
      alert('전화번호 값을 확인해주세요.');
    } else {
      axios
        .post(`${process.env.REACT_APP_TEST_API}/user/signup`, userData, {
          headers: { Authorization: localStorage.getItem('newUserToken') },
        })
        .then(res => {
          if (res.data.message === 'SIGNUP_SUCCESS') {
            alert('가입이 완료되었습니다.');
            navigate('/login');
          } else {
            alert('오류입니다. 관리자에게 문의하세요.');
          }
        });
    }
  };

  const checkAllWrite =
    userData.height &&
    userData.nickname &&
    userData.phoneNumber &&
    userData.weight &&
    checkNickName &&
    userData.interestedWorkout &&
    userData.workoutLoad &&
    (userData.userType === '1' || userData.specialized);
  return (
    <div className="signup contentsWrap">
      <div className="container">
        <p className="title">상세 정보 입력</p>
        <div className="userSortWrap">
          <label>
            <input
              type="radio"
              name="userType"
              value="1"
              defaultChecked
              onChange={e => handleInput(e)}
            />
            <span>일반인</span>
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="2"
              onChange={e => handleInput(e)}
            />
            <span>트레이너</span>
          </label>
          <span className="selection"></span>
        </div>

        <Input
          lable="닉네임"
          name="nickname"
          width="w80"
          onChange={handleInput}
          useBtn={true}
          onClick={handleCheckNickName}
          type="text"
          userData={userData}
        />
        <Input
          lable="전화번호(-생략)"
          type="tel"
          width="w100"
          name="phoneNumber"
          onChange={handleInput}
          maxLength={11}
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

export default Signup;
