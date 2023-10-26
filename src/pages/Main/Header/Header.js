import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginGroup from './LoginGroup/LoginGroup';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userType, setUserType] = useState('');
  const mouseInEvent = () => {
    setIsMouseIn(true);
  };
  const mouseOutEvent = () => {
    setIsMouseIn(false);
  };

  const goCommunity = () => {
    if (accessToken === '') {
      if (window.confirm('로그인이 필요한 서비스입니다.')) {
        navigate('/login');
      }
    } else {
      if (isSubscribed === 'true') {
        navigate('/communitylist');
      } else {
        if (window.confirm('구독이 필요한 서비스입니다.')) {
          navigate('/pay');
        }
      }
    }
  };

  const goTrainer = () => {
    if (accessToken === '') {
      if (window.confirm('로그인이 필요한 서비스입니다.')) {
        navigate('/login');
      }
    }
    navigate('/trainer');
  };

  const goSubScribe = () => {
    if (accessToken === '') {
      if (window.confirm('로그인이 필요한 서비스입니다.')) {
        navigate('/login');
      }
    } else if (accessToken.length !== 0) {
      navigate('/pay');
    }
  };

  useEffect(() => {
    const handleIsSubscribed = e => {
      if (e.key === 'isSubscribed') {
        if (e.newValue) {
          setIsSubscribed(e.newValue);
        } else {
          setIsSubscribed('');
        }
      }
    };
    const handleAccessToken = e => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          setAccessToken(e.newValue);
        } else {
          setAccessToken('');
        }
      }
    };
    const handleUserType = e => {
      if (e.key === 'userType') {
        if (e.newValue) {
          setUserType(e.newValue);
        } else {
          setUserType('');
        }
      }
    };

    window.addEventListener('storage', handleIsSubscribed);
    window.addEventListener('storage', handleAccessToken);
    window.addEventListener('storage', handleUserType);

    return () => {
      window.removeEventListener('storage', handleIsSubscribed);
      window.removeEventListener('storage', handleAccessToken);
      window.removeEventListener('storage', handleUserType);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isSubscribed = localStorage.getItem('isSubscribed');
    const userType = localStorage.getItem('userType');
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken('');
    }

    if (isSubscribed) {
      setIsSubscribed(isSubscribed);
    } else {
      setIsSubscribed('');
    }

    if (userType) {
      setUserType(userType);
    } else {
      setUserType('');
    }
  }, []);

  return (
    <header className="header">
      <div className="navOutWrap">
        <Link to="/" className="pathWrap">
          <img
            src={process.env.PUBLIC_URL + '/images/logo_white.png'}
            alt="득근득근 logo"
          />
        </Link>
        <nav className="navWrap">
          <ul className="navItemWrap">
            <li className="navItem">
              <Link to="/" className="pathWrap">
                홈
              </Link>
            </li>
            <li className="navItem">
              <button type="button" className="pathBtn" onClick={goCommunity}>
                커뮤니티
              </button>
            </li>
            <li className="navItem">
              <button type="button" className="pathBtn" onClick={goTrainer}>
                트레이너 매칭
              </button>
            </li>
            <li className="navItem">
              <button type="button" className="pathBtn" onClick={goSubScribe}>
                구독하기
              </button>
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
