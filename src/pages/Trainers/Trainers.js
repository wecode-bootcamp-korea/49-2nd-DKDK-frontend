import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trainers.scss';

const Trainers = () => {
  const [data, setData] = useState([]);
  const pagenation = document.querySelector('.pagination');
  const fullContent = document.querySelector('.contentsWrap');
  let bottom = false;

  document.addEventListener('scroll', onscroll, { passive: true });

  useEffect(() => {
    axios('/data/trainermatching.json').then(function (response) {
      setData(response.data);
    });
  }, []);

  return (
    <section className="contentsWrap">
      <div className="sortingBtn">
        <button className="myBtn">내 글 보기</button>
        <div className="checkboxWrap">
          <p>
            남 <input type="checkbox" />
          </p>
          <p>
            여 <input type="checkbox" />
          </p>
        </div>
        <select className="sortSelect">
          <option>회원수 순</option>
          <option>활동 순</option>
        </select>
      </div>
      <ul className="trainersWrap">
        {data.map(trainer => {
          return (
            <li className="trainerItem" key={trainer.id}>
              <div className="trainerImg">
                <img
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                  alt="프로필 이미지"
                />
              </div>
              <div className="trainerName">{trainer.user_name}</div>
              <div className="trainerInfo">
                <p className="infoHalf">
                  <span className="bold">전공</span>: {trainer.major}
                </p>
                <div className="detailInfo">
                  <p className="leftHalfWrap">
                    <span className="bold">가격</span>: {trainer.price}
                  </p>
                  <p className="halfWrap">
                    <span className="bold">시간</span>: {trainer.time}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pagination">페이지네이션</div>
    </section>
  );
};

export default Trainers;
