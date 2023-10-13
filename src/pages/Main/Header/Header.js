import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginGroup from './LoginGroup/LoginGroup';
import './Header.scss';

const Header = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const mouseInEvent = () => {
    setIsMouseIn(true);
  };
  const mouseOutEvent = () => {
    setIsMouseIn(false);
  };

  // 페이지 생성 후 Link path 설정하기
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
          <LoginGroup
            isMouseIn={isMouseIn}
            mouseInEvent={mouseInEvent}
            mouseOutEvent={mouseOutEvent}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
