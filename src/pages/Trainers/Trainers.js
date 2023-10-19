import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TrainersGroup from './TrainersGroup/TrainersGroup';
import './Trainers.scss';

const Trainers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  // const [offset, setOffset] = useState(0);
  // const [page, setPage] = useState(1);
  // const limit = 6;

  // useEffect(() => {
  //   if (searchParams.get('offset')) {
  //     setOffset(parseInt(searchParams.get('offset')));
  //   }
  // }, [searchParams]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;
  //     let nowOffset = 0;
  //     let nowPage = 1;
  //     if (scrollHeight - scrollTop === clientHeight) {
  //       nowOffset = page * limit;
  //       if (!searchParams.get('offset')) {
  //         searchParams.append('offset', 0);
  //         searchParams.append('limit', limit);
  //         setSearchParams(searchParams);
  //       } else {
  //         searchParams.set('offset', nowOffset);
  //         setPage(prevPage => prevPage + 1);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const [page, setPage] = useState(1);
  const [sortParam, setSortParam] = useState('');
  const [gender, setGender] = useState();
  const offset = searchParams.get('offset') || 0;
  const limit = 6;

  const setPaginationParams = nextOffset => {
    searchParams.set('offset', nextOffset);
    searchParams.set('limit', limit);
    searchParams.set('sort', sortParam);
    setSearchParams(searchParams);
  };

  const handleMy = () => {};

  const isChecked = () => {
    let genderParam = null;
    const checkboxMen = document.getElementById('men');
    const checkboxWomen = document.getElementById('women');
    const isCheckedMen = checkboxMen.checked;
    const isCheckedWomen = checkboxWomen.checked;

    if (isCheckedMen && isCheckedWomen) {
      genderParam = null;
    } else if (isCheckedMen) {
      genderParam = 1;
    } else if (isCheckedWomen) {
      genderParam = 2;
    }

    setGender(genderParam);

    const sortSearchParams = () => {
      searchParams.set('offset', 0);
      searchParams.set('limit', limit);
      setSearchParams(searchParams);
    };

    sortSearchParams();
    axios(
      `https://dummyjson.com/products?limit=${limit}&sort=${sortParam}&gender=${gender}`,
    ).then(function (response) {
      setData([...response.data.products]);
    });
  };

  const handleSortMine = () => {
    const nowSortParam = 'myContents';
    setSortParam(nowSortParam);

    const sortSearchParams = () => {
      searchParams.set('offset', 0);
      searchParams.set('limit', limit);
      searchParams.set('sort', nowSortParam);
      setSearchParams(searchParams);
    };

    sortSearchParams();
    axios(
      `https://dummyjson.com/products?limit=${limit}&sort=${nowSortParam}&gender=${gender}`,
    ).then(function (response) {
      setData([...response.data.products]);
    });
  };

  const handleSort = e => {
    const optionName = e.target.value;
    let nowSortParam = '';
    if (optionName === '등록 순') {
      nowSortParam = '';
    } else if (optionName === '회원수 순') {
      nowSortParam = 'customer';
    } else if (optionName === '활동 순') {
      nowSortParam = 'activation';
    } else if (optionName === '가격 순') {
      nowSortParam = 'price';
    }

    setSortParam(nowSortParam);

    const sortSearchParams = () => {
      searchParams.set('offset', 0);
      searchParams.set('limit', limit);
      searchParams.set('sort', nowSortParam);
      searchParams.set('gender', gender);
      setSearchParams(searchParams);
    };

    sortSearchParams();
    axios(
      `https://dummyjson.com/products?limit=${limit}&sort=${nowSortParam}&gender${gender}`,
    ).then(function (response) {
      setData([...response.data.products]);
    });
  };

  useEffect(() => {
    axios(
      `https://dummyjson.com/products?offset=${offset}&limit=${limit}&sort=${sortParam}&gender=${gender}`,
    ).then(function (response) {
      setData(prevData => [...prevData, ...response.data.products]);
    });
  }, [offset, limit, sortParam]);

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
  }, [page, limit, setPaginationParams]);

  return (
    <section className="contentsWrap">
      <div className="sortingBtn">
        <button className="myBtn">내 글 보기</button>
        <div className="checkboxWrap">
          <p>
            남 <input type="checkbox" id="men" />
          </p>
          <p>
            여 <input type="checkbox" id="women" />
          </p>
        </div>
        <select className="sortSelect">
          <option>옵션 선택</option>
          <option>등록 순</option>
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
