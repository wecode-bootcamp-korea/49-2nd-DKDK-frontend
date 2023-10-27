import React from 'react';
import axios from 'axios';
import './Pay.scss';
import { useNavigate } from 'react-router-dom';

const Pay = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const script = document.createElement('script');
  script.src = 'https://cdn.iamport.kr/v1/iamport.js';
  script.async = true;
  document.body.appendChild(script);
  const { IMP } = window;

  const Preparing = () => {
    alert('준비중입니다.');
  };
  const payMent = () => {
    IMP.init('imp50284103');

    let amount = userType === '1' ? '10000' : '20000';
    IMP.request_pay(
      {
        pg: 'kakaopay',
        amount: amount,
        name:
          'DKDK 커뮤니티 1개월 구독권' +
          (userType === '1' ? '(회원)' : '(트레이너)'),
      },
      function (response) {
        console.log('response : ', response);
        const { status, error_msg, imp_uid } = response;
        if (error_msg) {
          alert(error_msg);
        }
        if (status === 'paid') {
          axios
            .post(
              `${process.env.REACT_APP_TEST_API}/subscription`,
              { imp_uid: imp_uid },
              {
                headers: {
                  Authorization: localStorage.getItem('accessToken'),
                },
              },
            )
            .then(res => {
              console.log(res);
              if (res.data.message === 'PAYMENT_SUCCESS') {
                localStorage.setItem('isSubscribed', true);
                alert('결제가 완료되었습니다.');
                navigate('/');
              } else {
                alert('오류입니다. 관리자에게 문의하세요.');
              }
            });
        }
      },
    );
  };

  return (
    <div className="pay contentsWrap">
      <div className="container">
        <div className="titleWrap">
          <h2>득근득근 구독</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="3"
            viewBox="0 0 80 3"
            fill="none"
          >
            <line
              y1="1.5"
              x2="80.0062"
              y2="1.5"
              stroke="#ffe86f"
              stroke-width="3"
            />
          </svg>
        </div>
        <div className="subscriptInfoWrap">
          <p className="subscriptInfo">
            더 나은 건강을 위한 헬스케어 구독에 참여하세요! <br />
            우리의 커뮤니티에서 지식을 공유하고 다른 구독자와 연결하며,
            트레이너는 자신을 홍보하고, 매칭시스템에 등록 할 수 있습니다. <br />
            건강한 미래가 여기 있습니다.
          </p>
        </div>
      </div>
      <div className="payWrap">
        <div className="package ">
          <div className="infoWrap">
            <p className="title">1개월</p>
            <p className="payment">
              {userType === '1' ? '10,000원' : '20,000원'}
            </p>
            <p className="subInfo">구독자 커뮤니티 이용</p>
            <p className="subInfo">구독자 커뮤니티를 이용한 운동 피드백</p>
            <p className="subInfo">트레이너 매칭 등록(트레이너)</p>
            <p className="subInfo">해당 트레이너 홍보 효과(트레이너)</p>
            <button onClick={payMent}>
              <img
                class="kakaoImg"
                src="/images/kakaoPay.png"
                alt="카카오페이"
              />
            </button>
          </div>
        </div>
        <div className="package ">
          <div className="infoWrap">
            <p className="title">3개월</p>
            <p className="payment">
              {userType === '1' ? '25,000원' : '55,000원'}
            </p>
            <p className="subInfo">구독자 커뮤니티 이용</p>
            <p className="subInfo">구독자 커뮤니티를 이용한 운동 피드백</p>
            <p className="subInfo">트레이너 매칭 등록(트레이너)</p>
            <p className="subInfo">해당 트레이너 홍보 효과(트레이너)</p>
            <button onClick={Preparing}>
              <img
                class="kakaoImg"
                src="/images/kakaoPay.png"
                alt="카카오페이"
              />
            </button>
          </div>
        </div>
        <div className="package ">
          <div className="infoWrap">
            <p className="title">6개월</p>
            <p className="payment">
              {userType === '1' ? '50,000원' : '100,000원'}
            </p>
            <p className="subInfo">구독자 커뮤니티 이용</p>
            <p className="subInfo">구독자 커뮤니티를 이용한 운동 피드백</p>
            <p className="subInfo">트레이너 매칭 등록(트레이너)</p>
            <p className="subInfo">해당 트레이너 홍보 효과(트레이너)</p>
            <button onClick={Preparing}>
              <img
                class="kakaoImg"
                src="/images/kakaoPay.png"
                alt="카카오페이"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
