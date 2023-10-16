import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SubNav from './pages/Main/SubNav/SubNav';
import LoginKakao from './pages/Login/LoginKakao';
import LoginNaver from './pages/Login/LoginNaver';

const Router = () => {
  return (
    <BrowserRouter>
      <SubNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/naver" element={<LoginNaver />} />
        <Route path="/login/kakao" element={<LoginKakao />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
