import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoBox from './InfoBox';
import './MyPage.scss';

const MyPage = () => {
  const navigate = useNavigate();

  const goModiInfo = () => {
    navigate('/modiInfo');
  };
  const [myData, setMyData] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEST_API}/userHealthInfo`, {
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      })
      .then(res => {
        setMyData(res.data.data);
      });
  }, []);

  if (!myData) {
    return null;
  }
  console.log(myData.foodRcmd[0]);
  return (
    <div className="myPage contentsWrap">
      <div className="titleWrap">
        <h1 className="title">마이페이지</h1>
      </div>
      <div className="container">
        <div className="myInfo">
          <div className="subTitle">
            <h2>프로필</h2>
            <button onClick={goModiInfo}>수정하기</button>
          </div>
          <div className="myForm">
            <div className="myLeftForm">
              <img
                src={
                  myData.userInfo[0].profileImg
                    ? myData.userInfo[0].profileImg
                    : '/images/defult_profile.png'
                }
                alt="프로필"
              />
            </div>
            <div className="myRightForm">
              <div className="bordBox">
                <div className="boxLeft">
                  <InfoBox id="닉네임" value={myData.userInfo[0].nickname} />
                  <InfoBox
                    id="성별"
                    value={myData.userInfo[0].gender === '1' ? '남성' : '여성'}
                  />
                  <InfoBox
                    id="휴대폰번호"
                    value={myData.userInfo[0].phoneNumber}
                  />
                  <InfoBox id="생년월일" value={myData.userInfo[0].birthday} />
                </div>
                <div className="boxRight">
                  <InfoBox id="키" value={`${myData.userInfo[0].height}cm`} />
                  <InfoBox
                    id="몸무게"
                    value={`${myData.userInfo[0].weight}kg`}
                  />
                  <InfoBox
                    id="관심운동"
                    value={myData.userInfo[0].interested_workout}
                  />
                  <InfoBox
                    id="운동강도"
                    value={myData.userInfo[0].workoutLoad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {myData.trainerInfo !== 'NOT_A_TRAINER' && (
          <div className="myInfo">
            <div className="subTitle">
              <h2>내 정보</h2>
            </div>
            <div className="myForm">
              <div className="trainerBox">
                <InfoBox
                  setDisplay="flexBox"
                  id="운동분야"
                  value={myData.trainerInfo[0].specialized}
                />
                <InfoBox
                  setDisplay="flexBox"
                  id="회원 수"
                  value={`${myData.trainerInfo[0].customers} 명`}
                />
                <InfoBox
                  setDisplay="flexBox"
                  id="댓글 수"
                  value={`${myData.trainerInfo[0].comments} 개`}
                />
              </div>
            </div>
          </div>
        )}

        {myData.ptOrderInfo != 'NO_PT_ORDERS' &&
          myData.ptOrderInfo.map(item => (
            <div className="myInfo">
              <div className="subTitle">
                <h2>담당 트레이너</h2>
              </div>
              <div className="myForm">
                <div className="myLeftForm">
                  <img
                    src={
                      item.profileImg
                        ? item.profileImg
                        : '/images/defult_profile.png'
                    }
                    alt="트레이너 프로필"
                  />
                </div>
                <div className="myRightForm">
                  <div className="bordBox">
                    <div className="boxLeft">
                      <InfoBox
                        id="이름 / 성별"
                        value={`${item.trainerName} / ${item.gender}`}
                      />
                      <InfoBox id="지역" value={item.availableArea} />
                      <InfoBox id="휴대폰번호" value={item.phoneNumber} />
                    </div>
                    <div className="boxRight">
                      <InfoBox
                        id="키 / 몸무게"
                        value={`${item.height}cm / ${item.weight}kg`}
                      />
                      <InfoBox id="종료날짜" value={item.end_at} />
                      <InfoBox id="운동분야" value={item.category} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="myInfo">
          <div className="subTitle">
            <h2>내 식단 추천</h2>
          </div>
          <div className="myForm">
            {myData.foodRcmd &&
              myData.foodRcmd[0].mealPlan.map(item => (
                <div className="recommandForm" key={item.name}>
                  <img src={item.imgUrl} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>내 운동 추천</h2>
          </div>
          <div className="myForm">
            {myData.workoutRcmd &&
              myData.workoutRcmd.map(item => (
                <div className="recommandForm" key={item.name}>
                  <img src={item.img_url} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
