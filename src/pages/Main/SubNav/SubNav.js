import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SubNav.scss';

const PAGES_NAME_LIST = [
  { id: 1, path: '/', name: 'HOME' },
  { id: 2, path: '/1', name: 'COMMUNITY' },
  { id: 3, path: '/2', name: 'TRAINER MATCHING' },
  { id: 4, path: '/3', name: 'SUBSCRIBE' },
  { id: 5, path: '/login', name: 'LOGIN' },
  { id: 6, path: '/5', name: 'DETAIL INFORMATION' },
];

const SubNav = () => {
  const location = useLocation();
  const nowPath = location.pathname;

  const findPathName = PAGES_NAME_LIST => {
    if (PAGES_NAME_LIST.path === nowPath) {
      return true;
    }
  };

  const path = PAGES_NAME_LIST.find(findPathName);
  const pathName = path.name;

  if (nowPath !== '/' && nowPath !== '/login') {
    return (
      <div className="SubNav">
        <div className="categoryWrap">
          <h1>{pathName}</h1>
          <ul className="goPageList">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>/ {pathName}</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default SubNav;
