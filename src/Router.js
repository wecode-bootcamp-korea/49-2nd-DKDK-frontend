import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Header from './pages/Main/Header/Header';
import SubNav from './pages/Main/SubNav/SubNav';
import LoginKakao from './pages/Login/LoginKakao';
import LoginNaver from './pages/Login/LoginNaver';
import CommunityList from './pages/CommunityList/CommunityList';
import Trainers from './pages/Trainers/Trainers';
import ModiInfo from './pages/ModiInfo/ModiInfo';
import MyPage from './pages/MyPage/MyPage';
import Signup from './pages/Signup/Signup';
import CommunityPost from './pages/CommunityPost/CommunityPost';
import Record from './pages/Record/Record';
import CommunityDetail from './pages/CommunityDetail/CommunityDetail';
import Pay from './pages/Pay/Pay';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <SubNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/naver" element={<LoginNaver />} />
        <Route path="/login/kakao" element={<LoginKakao />} />
        <Route path="/communitylist" element={<CommunityList />} />
        <Route path="/trainer" element={<Trainers />} />
        <Route path="/modiInfo" element={<ModiInfo />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/communitypost" element={<CommunityPost />} />
        <Route path="/record" element={<Record />} />
        <Route path="/communitydetail" element={<CommunityDetail />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
