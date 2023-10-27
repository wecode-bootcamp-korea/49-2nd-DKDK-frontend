import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainerDetail.scss';

const TrainerDetail = ({ setIsDetail, postId }) => {
  const script = document.createElement('script');
  script.src = 'https://cdn.iamport.kr/v1/iamport.js';
  script.async = true;
  document.body.appendChild(script);
  const { IMP } = window;
  const [detailData, setDetailData] = useState({});
  const [gender, setGender] = useState('');
  const [isMine, setIsMine] = useState(false);
  const {
    imgUrl,
    price,
    availableArea,
    availableTime,
    categoryName,
    term,
    content,
    name,
    weight,
    height,
  } = detailData;

  const handleClose = () => {
    setIsDetail(false);
  };
  const productData = {
    pg: 'kakaopay',
    name: `${categoryName}, ${term}개월`,
    amount: price,
    merchant_uid: postId,
  };
  const buyContent = () => {
    const storeCode = 'imp80367710';
    IMP.init(storeCode);

    if (window.confirm('구매 하시겠습니까?')) {
      IMP.request_pay(productData, function (response) {
        console.log('response : ', response);
        const { status, error_msg, imp_uid } = response;
        if (error_msg) {
          alert(error_msg);
        }
        if (status === 'paid') {
          console.log('성공');
          setIsDetail(false);
          // setData(data.filter(el => el.id !== postId));
          window.location.reload();
          // axios
          //   .post(
          //     `${process.env.REACT_APP_TEST_API}/subscription`,
          //     { imp_uid: imp_uid },
          //     {
          //       headers: {
          //         Authorization: localStorage.getItem('accessToken'),
          //       },
          //     },
          //   )
          //   .then(res => {
          //     console.log(res);
          //     if (res.data.message === 'PAYMENT_SUCCESS') {
          //       localStorage.setItem('isSubscribed', true);
          //       alert('결제가 완료되었습니다.');
          //     } else {
          //       alert('오류입니다. 관리자에게 문의하세요.');
          //     }
          //   });
        }
      });
    }
  };

  const deletePost = () => {
    const token = localStorage.getItem('accessToken');
    axios
      .post(
        `${process.env.REACT_APP_TEST_API}/training/delete`,
        { productId: postId },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(res => {
        if (res.data.message === 'DELETE_SUCCESS') {
          alert('삭제가 완료되었습니다.');
          window.location.reload();
        } else {
          alert('삭제가 실패하였습니다.');
        }
      });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_TEST_API}/training/detail?productId=${postId}`,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      )
      .then(function (response) {
        const dataArray = response.data.data.data;
        console.log(dataArray.trainerId);
        setDetailData(dataArray);
        if (dataArray.gender === 1) {
          setGender('남성');
        } else {
          setGender('여성');
        }

        if (response.data.data.trainerInfo === dataArray.trainerId) {
          setIsMine(true);
        }
        console.log(response);
      });
  }, []);

  return (
    <div className="trainerDetailWrap">
      <div className="trainerDetail">
        <div className="contentsWrap">
          {isMine && (
            <button type="button" className="deleteBtn" onClick={deletePost}>
              삭제하기
            </button>
          )}
          <button type="button" className="closeBtn" onClick={handleClose}>
            닫기
          </button>
          <section className="profileWrap">
            <div className="profileInfoWrap">
              <div className="profileImgWrap">
                {imgUrl ? (
                  <img
                    className="profileImg"
                    src={process.env.PUBLIC_URL + `${imgUrl}`}
                    alt="트레이너 프로필"
                  />
                ) : (
                  <img
                    className="profileImg"
                    src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                    alt="기본 이미지"
                  />
                )}
              </div>
              <p className="profileName">{name}</p>
            </div>
            <div className="detailInfoWrap">
              <div className="infoNameWrap">
                <p className="infoName">상세 정보</p>
              </div>
              <ul className="detailInfo">
                <li className="detailInfoItem">
                  <p className="infoDetailName">키/몸무게</p>
                  <p className="infoDetail">
                    {height}cm/{weight}kg
                  </p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">운동종목</p>
                  <p className="infoDetail">{categoryName}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능지역</p>
                  <p className="infoDetail">{availableArea}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능시간</p>
                  <p className="infoDetail">{availableTime}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">운동 기간</p>
                  <p className="infoDetail">{term}개월</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">성별</p>
                  <p className="infoDetail">{gender}</p>
                </li>
              </ul>
            </div>
          </section>
          <div className="goPayWrap">
            <p className="cost">{price} 원</p>
            <button type="button" className="goPayBtn" onClick={buyContent}>
              <img
                src={process.env.PUBLIC_URL + '/images/kakaoPay.png'}
                alt="카카오페이"
              />
            </button>
          </div>
          <section className="prWrap">
            <div className="prImgWrap">
              {imgUrl ? (
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + `${imgUrl}`}
                  alt="자기소개"
                />
              ) : (
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                  alt="기본이미지"
                />
              )}
            </div>
            <div className="prTextWrap">{content}</div>
          </section>
          <div className="bottomBtnWrap">
            <button
              type="button"
              className="goPayBottomBtn"
              onClick={buyContent}
            >
              <img
                src={process.env.PUBLIC_URL + '/images/kakaoPay.png'}
                alt="카카오페이"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
