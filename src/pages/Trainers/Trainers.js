import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainersGroup from './TrainersGroup/TrainersGroup';
import SelectBox from './SelectBox/SelectBox';
import './Trainers.scss';
import TrainerRegis from '../TrainerRegis/TrainerRegis';

const Trainers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState();
  const [kind, setKind] = useState();
  const [gender, setGender] = useState();
  const [isPost, setIsPost] = useState(false);

  const handleIsPost = () => {
    setIsPost(true);
  };

  useEffect(() => {
    const axiosData = () => {
      let nowUrl = `offset=${offset}&limit=6`;
      if (sort) {
        nowUrl += `&sort=${sort}`;
      }
      if (kind) {
        nowUrl += `&kind=${kind}`;
      }

      if (gender) {
        nowUrl += `&gender=${gender}`;
      }

      axios(`https://dummyjson.com/products?${nowUrl}`).then(
        function (response) {
          if (offset === 0) {
            setPage(1);
            setData([...response.data.products]);
          } else {
            setData(prevData => prevData.concat(response.data.products));
          }
        },
      );
    };

    axiosData();
  }, [sort, kind, gender, page]);

  const handleOption = e => {
    const optionName = e.target.value;
    setOffset(0);

    if (optionName === '등록 순') {
      setSort(null);
    } else if (optionName === '회원수 순') {
      setSort('customer');
    } else if (optionName === '활동 순') {
      setSort('activity');
    } else if (optionName === '가격 순') {
      setSort('price');
    } else if (optionName === '전체') {
      setKind(null);
    } else if (optionName === '헬스') {
      setKind('health');
    } else if (optionName === '필라테스') {
      setKind('pilates');
    } else if (optionName === '요가') {
      setKind('yoga');
    }
  };

  const isChecked = e => {
    const genderParam = e.target.value;
    const isCheckedMen = e.target.checked;
    const isCheckedWomen = e.target.checked;
    setOffset(0);

    if (isCheckedMen) {
      setGender(genderParam);
    } else if (isCheckedWomen) {
      setGender(genderParam);
    }
  };

  const genderClear = () => {
    setOffset(0);
    setGender(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        if (data.length === page * 6) {
          setOffset(page * 6);
          setPage(page + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, page]);

  return (
    <>
      {isPost && <TrainerRegis setIsPost={setIsPost} />}
      <section className="contentsWrap">
        <div className="sortingBtn">
          <button type="button" className="postBtn" onClick={handleIsPost}>
            등록하기
          </button>
          <button type="button" className="myBtn">
            내 글 보기
          </button>
          <form className="checkboxWrap" onChange={isChecked}>
            <label>
              <input type="radio" name="gender" value="men" /> 남
            </label>
            <label>
              <input type="radio" name="gender" value="women" /> 여
            </label>
            <input
              type="reset"
              value="성별 해제"
              className="reset"
              onClick={genderClear}
            />
          </form>
          <SelectBox type="옵션" handleOption={handleOption} />
          <SelectBox handleOption={handleOption} />
        </div>
        <TrainersGroup trainerListData={data} />
      </section>
    </>
  );
};

export default Trainers;
