import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginGroup from './LoginGroup/LoginGroup';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const mouseInEvent = () => {
    setIsMouseIn(true);
  };
  const mouseOutEvent = () => {
    setIsMouseIn(false);
  };

  const goCommunity = () => {
    if (accessToken === '') {
      window.confirm('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      if (isSubscribed === 'true') {
        navigate('/communitylist');
      } else {
        window.confirm('구독이 필요한 서비스입니다.');
        navigate('/pay');
      }
    }
  };

  const goTrainer = () => {
    if (accessToken === '') {
      window.confirm('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      if (isSubscribed === 'true') {
        navigate('/trainer');
      } else {
        window.confirm('구독이 필요한 서비스입니다.');
        navigate('/pay');
      }
    }
  };

  const goSubScribe = () => {
    if (accessToken === '') {
      window.confirm('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
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

    window.addEventListener('storage', handleIsSubscribed);
    window.addEventListener('storage', handleAccessToken);

    return () => {
      window.removeEventListener('storage', handleIsSubscribed);
      window.removeEventListener('storage', handleAccessToken);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isSubscribed = localStorage.getItem('isSubscribed');
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
