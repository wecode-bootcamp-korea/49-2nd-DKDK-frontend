import React from 'react';
import { Link } from 'react-router-dom';
import './LoginGroup.scss';

const LoginGroup = ({ isMouseIn, mouseInEvent, mouseOutEvent }) => {
  if (localStorage.getItem(accessToken) === true) {
    <div className="loginWrap">
      <Link to="/login">로그인/회원가입</Link>
    </div>;
  } else {
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
