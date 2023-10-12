import React from 'react';
import './Login.scss';

const Login = () => {
  const kakaoAuthUrl = process.env.REACT_APP_KAKAO_REST_API;
  const naverAuthUrl = process.env.REACT_APP_NAVER_REST_API;
  return (
    <div className="login">
      <div className="contentsWrap">
        <a className="snsLogin" href={kakaoAuthUrl}>
          <button className="snsBtn loginKakao">
            <img src="/images/login_kakao.svg" alt="카카오 이미지" />
            <strong>카카오</strong>로 로그인
          </button>
        </a>
        <a className="snsLogin" href={naverAuthUrl}>
          <button className="snsBtn loginNaver">
            <img src="/images/login_naver.svg" alt="네이버 이미지" />
            <strong>네이버</strong>로 로그인
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
