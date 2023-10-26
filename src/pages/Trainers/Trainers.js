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
  const [category, setCategory] = useState();
  const [gender, setGender] = useState(0);
  const [isPost, setIsPost] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [postId, setPostId] = useState('');
  const [isCanPost, setIsCanPost] = useState(false);
  const [myInfo, setMyInfo] = useState({});
  const isSubscribed = localStorage.getItem('isSubscribed');
  const navigate = useNavigate();

  const handleIsPost = () => {
    if (isSubscribed === 'true') {
      if (isCanPost === true) {
        setIsPost(true);
      } else {
        window.confirm('이미 등록된 게시글이 존재합니다.');
      }
    } else {
      if (window.confirm('구독이 필요한 서비스 입니다.')) {
        navigate('/pay');
      }
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
      if (trainer === '1') {
        setIsTrainer(false);
      } else if (trainer === '2') {
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
      if (category) {
        nowUrl += `&category=${category}`;
      }
      if (gender) {
        nowUrl += `&gender=${gender}`;
      }
      if (myPost) {
        nowUrl += `&isTrainer=${myPost}`;
      }

      axios
        .get(`${process.env.REACT_APP_TEST_API}/training?${nowUrl}`, {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            isTrainer: isTrainer,
          },
        })
        .then(function (response) {
          const dataArray = response.data.data.data;
          console.log('data :', response.data);
          setMyInfo({
            trainerIng: response.data.data.trainerImg,
            trainerName: response.data.data.trainerName,
          });
          if (response.data.data.isPostedTrainer) {
            setIsCanPost(false);
          } else {
            setIsCanPost(true);
          }

          if (offset === 0) {
            setPage(1);
            setData([...dataArray]);
          } else {
            setData(prevData => prevData.concat(...dataArray));
          }
        });
    };

    axiosData();
  }, [sort, category, gender, page, myPost]);

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
      setCategory(null);
    } else if (optionName === '헬스') {
      setCategory(1);
    } else if (optionName === '필라테스') {
      setCategory(2);
    } else if (optionName === '요가') {
      setCategory(3);
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

  const isMine = () => {
    setMyPost(1);
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
      {isPost && <TrainerRegis setIsPost={setIsPost} myInfo={myInfo} />}
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
            <button type="button" className="myBtn" onClick={isMine}>
              내 글 보기
            </button>
          )}
          <form className="checkboxWrap" onChange={isChecked}>
            <label>
              <input type="radio" name="gender" value="1" /> 남
            </label>
            <label>
              <input type="radio" name="gender" value="2" /> 여
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
