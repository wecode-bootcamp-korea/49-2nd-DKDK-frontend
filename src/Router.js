import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Header from './pages/Main/Header/Header';
import LoginKakao from './pages/Login/LoginKakao';
import LoginNaver from './pages/Login/LoginNaver';
import ModiInfo from './pages/ModiInfo/ModiInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/naver" element={<LoginNaver />} />
        <Route path="/login/kakao" element={<LoginKakao />} />
        <Route path="/modiInfo" element={<ModiInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
