import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginNaver = () => {
  const [serchParams] = useSearchParams();
  const code = serchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    code &&
      axios
        .get(`http://10.58.52.78:4000/auth/naver/callback?code=${code}`)
        .then(res => {
          if (res.data.message === 'LOGIN_SUCCESS') {
            navigate('/signup');
          }
        });
  }, []);

  return <></>;
};

export default LoginNaver;
