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
        .get(`http://10.58.52.78:4000/auth/kakao/callback?code=${code}`)
        .then(res => {
          if (res.data.message === 'LOGIN_SUCCESS') {
            navigate('/');
          }
        });
  }, []);

  return <></>;
};

export default LoginKakao;
