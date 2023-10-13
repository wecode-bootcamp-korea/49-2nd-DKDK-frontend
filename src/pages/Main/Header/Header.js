import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginGroup from './LoginGroup/LoginGroup';
import './Header.scss';

// 페이지 생성 후 Link path 설정하기
const PATH_NAV = [
  { id: 1, name: '홈', path: '/' },
  { id: 2, name: '커뮤니티', path: '' },
  { id: 3, name: '트레이너 매칭', path: '' },
  { id: 4, name: '구독하기', path: '' },
];

const Header = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const mouseInEvent = () => {
    setIsMouseIn(true);
  };
  const mouseOutEvent = () => {
    setIsMouseIn(false);
  };

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
            {PATH_NAV.map(nav => {
              return (
                <li className="navItem" key={nav.id}>
                  <Link to={nav.path}>{nav.name}</Link>
                </li>
              );
            })}
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
