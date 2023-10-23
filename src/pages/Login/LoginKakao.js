import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginKakao = () => {
  const [serchParams] = useSearchParams();
  const code = serchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    code &&
      axios
        .get(
          `${process.env.REACT_APP_TEST_API}/auth/kakao/callback?code=${code}`,
        )
        .then(res => {
          if (res.data.message === 'NEW_USER') {
            localStorage.setItem('newUserToken', res.data.token);
            navigate('/signup');
          } else if (res.data.message === 'LOGIN_SUCCESS') {
            localStorage.setItem('accessToken', res.data.token);
            localStorage.setItem('userType', res.data.userType);
            localStorage.setItem('isSubscribed', res.data.isSubscribed);
            navigate('/main');
          }
        });
  }, []);

  return <></>;
};

export default LoginKakao;
