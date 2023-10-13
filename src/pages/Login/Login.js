import React from 'react';
import './Login.scss';

const Login = () => {
  const kakaoAuthUrl = process.env.REACT_APP_KAKAO_REST_API;
  const naverAuthUrl = process.env.REACT_APP_NAVER_REST_API;

  return (
    <div className="login contentsWrap">
      <div className="wrap">
        <div className="logoWrap">
          <img src="/images/logo_white.png" />
        </div>
        <div className="loginWrap">
          <a className="snsLogin" href={kakaoAuthUrl}>
            <span className="snsBtn loginKakao">
              <img src="/images/login_kakao.svg" alt="카카오" />
              <strong>카카오</strong>로 로그인
            </span>
          </a>
          <a className="snsLogin" href={naverAuthUrl}>
            <span className="snsBtn loginNaver">
              <img src="/images/login_naver.svg" alt="네이버" />
              <strong>네이버</strong>로 로그인
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
