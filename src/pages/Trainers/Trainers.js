import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Trainers.scss';

const Trainers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  let offset = searchParams.get('offset');
  let limit = searchParams.get('limit');

  if (offset === null) {
    offset = 6;
  }

  const setPaginationParams = () => {
    limit = 12;
    searchParams.set('offset', page * 6);
    searchParams.set('limit', page * 6);
    setSearchParams(setSearchParams);
  };

  useEffect(() => {
    axios('https://dummyjson.com/products?offset=0&limit=6').then(
      function (response) {
        setPaginationParams();
        setData(response.data.products);
      },
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        axios(
          `https://dummyjson.com/products?offset=${offset}&limit=${limit}`,
        ).then(function (response) {
          setPaginationParams();
          setData(response.data.products);
          setPage(page + 1);
          console.log('offset:', offset);
          console.log(data);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

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
        {data?.map((trainer, index) => {
          return (
            <li className="trainerItem" key={index}>
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
                    <span className="bold">가격</span>
                    {`: ${trainer.price.toLocaleString()}`}
                  </p>
                  <p className="halfWrap">
                    <span className="bold">위치</span>: {trainer.available_area}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Trainers;
