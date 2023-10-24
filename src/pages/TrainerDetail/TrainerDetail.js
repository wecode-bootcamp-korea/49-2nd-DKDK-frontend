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
  const {
    images,
    price,
    brand,
    category,
    description,
    discountPercentage,
    title,
    thumbnail,
    stock,
    rating,
  } = detailData;

  const handleClose = () => {
    setIsDetail(false);
  };
  const productData = {
    pg: 'kakaopay',
    name: title,
    amount: price,
    // merchant_uid: postId,
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

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${postId}`, {
        header: { Authorization: localStorage.getItem('accessToken') },
      })
      .then(function (response) {
        setDetailData(response.data);
      });
  }, []);

  return (
    <div className="trainerDetailWrap">
      <div className="trainerDetail">
        <div className="contentsWrap">
          <button type="button" className="deleteBtn">
            삭제하기
          </button>
          <button type="button" className="closeBtn" onClick={handleClose}>
            닫기
          </button>
          <section className="profileWrap">
            <div className="profileInfoWrap">
              <div className="profileImgWrap">
                {images ? (
                  <img
                    className="profileImg"
                    src={process.env.PUBLIC_URL + `${thumbnail}`}
                  />
                ) : (
                  <img
                    className="profileImg"
                    src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                  />
                )}
              </div>
              <p className="profileName">{title}</p>
            </div>
            <div className="detailInfoWrap">
              <div className="infoNameWrap">
                <p className="infoName">상세 정보</p>
              </div>
              <ul className="detailInfo">
                <li className="detailInfoItem">
                  <p className="infoDetailName">키/몸무게</p>
                  <p className="infoDetail">{price}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">운동종목</p>
                  <p className="infoDetail">{brand}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능지역</p>
                  <p className="infoDetail">{category}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능시간</p>
                  <p className="infoDetail">{discountPercentage}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">회원수</p>
                  <p className="infoDetail">{stock}</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">활동량</p>
                  <p className="infoDetail">{rating}</p>
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
              {images ? (
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + `${thumbnail}`}
                />
              ) : (
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                />
              )}
            </div>
            <div className="prTextWrap">{description}</div>
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
