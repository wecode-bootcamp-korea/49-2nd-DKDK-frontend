import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="navOutWrap">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/images/logo_white.png'}
            alt="득근득근 logo"
          />
        </Link>
        <nav className="navWrap">
          <ul className="navItemWrap">
            <li className="navItem">
              <Link to="/">홈</Link>
            </li>
            <li className="navItem">
              <Link to="/">커뮤니티</Link>
            </li>
            <li className="navItem">
              <Link to="/">트레이너 매칭</Link>
            </li>
            <li className="navItem">
              <Link to="/">구독하기</Link>
            </li>
          </ul>
          <div className="loginWrap">
            <Link to="/login">로그인/회원가입</Link>
            <button type="button">마이페이지</button>
            <div className="dropdown">
              <ul>
                <li>
                  <Link to="/">운동 기록</Link>
                </li>
                <li>
                  <button type="button">로그아웃</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
