import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainersGroup from './TrainersGroup/TrainersGroup';
import SelectBox from './SelectBox/SelectBox';
import TrainerRegis from '../TrainerRegis/TrainerRegis';
import TrainerDetail from '../TrainerDetail/TrainerDetail';
import './Trainers.scss';

const Trainers = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState();
  const [kind, setKind] = useState();
  const [gender, setGender] = useState();
  const [isPost, setIsPost] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [postId, setPostId] = useState('');
  const isSubscribed = localStorage.getItem('isSubscribed');
  const navigate = useNavigate();

  const handleIsPost = () => {
    if (isSubscribed === 'true') {
      setIsPost(true);
    } else {
      window.confirm('구독이 필요한 서비스 입니다.');
      navigate('/trainer');
    }
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const isTrainer = () => {
      const trainer = localStorage.getItem('userType');
      if (trainer == 1) {
        setIsTrainer(false);
      } else if (trainer == 2) {
        setIsTrainer(true);
      }
    };
    isTrainer();
  }, []);

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

      axios
        .get(`https://dummyjson.com/products?${nowUrl}`, {
          header: { Authorization: localStorage.getItem('accessToken') },
        })
        .then(function (response) {
          if (offset === 0) {
            setPage(1);
            setData([...response.data.products]);
          } else {
            setData(prevData => prevData.concat(response.data.products));
          }
        });
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

  // const myContent = () => {
  //   setOffset(0);
  //   axios
  //     .get(
  //       'https://dummyjson.com/products?offset=0&limit=6',
  // , {
  //   header: { Authorization: localStorage.getItem('accessToken') },
  // }
  //     )
  //     .then(function (response) {
  //       setPage(1);
  //       setData([...response.data.products]);
  //     });
  // };

  return (
    <>
      {isPost && <TrainerRegis setIsPost={setIsPost} />}
      {isDetail && (
        <TrainerDetail
          setIsDetail={setIsDetail}
          postId={postId}
          isTrainer={isTrainer}
        />
      )}
      <section className="contentsWrap">
        <button type="button" className="top" onClick={goTop}>
          TOP
        </button>
        <div className="sortingBtn">
          {isTrainer && (
            <button type="button" className="postBtn" onClick={handleIsPost}>
              등록하기
            </button>
          )}
          {isTrainer && (
            <button type="button" className="myBtn">
              내 글 보기
            </button>
          )}
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
        <TrainersGroup
          trainerListData={data}
          setIsDetail={setIsDetail}
          setPostId={setPostId}
        />
      </section>
    </>
  );
};

export default Trainers;
