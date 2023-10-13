import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginGroup.scss';

const LoginGroup = ({ isMouseIn, mouseInEvent, mouseOutEvent }) => {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, []);

  useEffect(() => {
    const handleToken = e => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      }
    };

    window.addEventListener('storage', handleToken);

    return () => {
      window.removeEventListener('storage', handleToken);
    };
  }, []);

  if (isToken === false) {
    return (
      <div className="loginWrap">
        <Link to="/login">로그인/회원가입</Link>
      </div>
    );
  } else if (isToken === true) {
    return (
      <div className="loginWrap">
        <button
          type="button"
          onMouseEnter={mouseInEvent}
          onMouseLeave={mouseOutEvent}
        >
          마이페이지
        </button>
        {isMouseIn && (
          <div
            className="dropdown"
            onMouseEnter={mouseInEvent}
            onMouseLeave={mouseOutEvent}
          >
            <ul>
              <li>
                <Link to="/">운동 기록</Link>
              </li>
              <li>
                <button type="button">로그아웃</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default LoginGroup;
