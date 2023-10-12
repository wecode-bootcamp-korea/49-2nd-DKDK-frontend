import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginKakao = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    code &&
      axios
        .get(`http://10.58.52.78:4000/auth/kakao/callback?code=${code}`)
        .then(res => {
          console.log(res);
          if (res.data.message === 'LOGIN_SUCCESS') {
            navigate('/');
          }
        });
  }, []);

  return <></>;
};

export default LoginKakao;
