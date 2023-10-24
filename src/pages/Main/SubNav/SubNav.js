import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SubNav.scss';

const PAGES_NAME_LIST = [
  { id: 1, path: '/user-post', name: 'COMMUNITY' },
  { id: 2, path: '/trainer', name: 'TRAINER MATCHING' },
  { id: 3, path: '/3', name: 'SUBSCRIBE' },
];

const EXCEPTIONAL_PATHS = [
  '/',
  '/login',
  '/login/naver',
  '/login/kakao',
  '/signup',
  '/my-page',
  '/record',
  '/modiInfo',
  '/postsignup',
];

const SubNav = () => {
  const { pathname } = useLocation();

  const pageName = PAGES_NAME_LIST.find(({ path }) => path === pathname)?.name;
  const isExceptionalPath = EXCEPTIONAL_PATHS.some(
    exceptionalPath => exceptionalPath === pathname,
  );
  if (isExceptionalPath) return null;

  return (
    <div className="SubNav">
      <div className="categoryWrap">
        <h1>{pageName}</h1>
        <ul className="goPageList">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>/ {pageName}</li>
        </ul>
      </div>
    </div>
  );
};

export default SubNav;
