import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TrainersGroup from './TrainersGroup/TrainersGroup';
import './Trainers.scss';

const Trainers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  let offset = searchParams.get('offset');
  const limit = 6;

  if (offset === null) {
    offset = 0;
  }

  const setPaginationParams = nextOffset => {
    searchParams.set('offset', nextOffset);
    searchParams.set('limit', limit);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    axios(
      `https://dummyjson.com/products?offset=${offset}&limit=${limit}`,
    ).then(function (response) {
      setData(prevData => [...prevData, ...response.data.products]);
    });
  }, [offset, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        const nextOffset = page * limit;
        setPaginationParams(nextOffset);
        setPage(prevPage => prevPage + 1);
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
          <option>가격 순</option>
        </select>
      </div>
      <TrainersGroup trainerListData={data} />
    </section>
  );
};

export default Trainers;
