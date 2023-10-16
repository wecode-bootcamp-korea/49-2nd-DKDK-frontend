import React, { useEffect, useState } from 'react';
import './MyPage.scss';
import InfoBox from './InfoBox';

const MyPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/data/myPage.json')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result);
      });
  }, []);

  return (
    <div className="myPage contentsWrap">
      <div className="titleWrap">
        <h1 className="title">마이페이지</h1>
      </div>
      <div className="container">
        <div className="myInfo">
          <div className="subTitle">
            <h2>프로필</h2>
            <button>수정하기</button>
          </div>
          <div className="myForm">
            <div className="myLeftForm">
              <img src="/images/defult_profile.png" alt="프로필" />
            </div>
            <div className="myRightForm">
              <div className="bordBox">
                <div className="boxLeft">
                  <InfoBox id="닉네임" value="홍길동" />
                  <InfoBox id="성별" value="남성" />
                  <InfoBox id="휴대폰번호" value="010-1234-1234" />
                  <InfoBox id="생년월일" value="1998-09-11" />
                </div>
                <div className="boxRight">
                  <InfoBox id="키" value="173cm" />
                  <InfoBox id="몸무게" value="80kg" />
                  <InfoBox id="관심운동" value="헬스" />
                  <InfoBox id="운동강도" value="상" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>내 정보</h2>
          </div>
          <div className="myForm">
            <div className="trainerBox">
              <InfoBox class="flexBox" id="운동분야" value="173cm" />
              <InfoBox class="flexBox" id="회원 수" value="173cm" />
              <InfoBox class="flexBox" id="댓글 수" value="173cm" />
            </div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>담당 트레이너</h2>
          </div>
          <div className="myForm">
            <div className="myLeftForm">
              <img src="/images/defult_profile.png" alt="트레이너 프로필" />
            </div>
            <div className="myRightForm">
              <div className="bordBox">
                <div className="boxLeft">
                  <InfoBox id="이름" value="홍길동" />
                  <InfoBox id="성별" value="남성" />
                  <InfoBox id="휴대폰번호" value="010-1234-1234" />
                </div>
                <div className="boxRight">
                  <InfoBox id="키" value="173cm" />
                  <InfoBox id="몸무게" value="80kg" />
                  <InfoBox id="운동분야" value="헬스" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="myInfo">
          <div className="subTitle">
            <h2>내 식단 추천</h2>
          </div>
          <div className="myForm">
            {data.map(item => (
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
            {data.map(item => (
              <div className="recommandForm" key={item.name}>
                <img src={item.imgUrl} alt={item.name} />
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
