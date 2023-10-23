import React from 'react';
import './TrainerDetail.scss';

const TrainerDetail = () => {
  return (
    <div className="trainerDetailWrap">
      <div className="trainerDetail">
        <div className="contentsWrap">
          <button type="button" className="closeBtn">
            닫기
          </button>
          <section className="profileWrap">
            <div className="profileInfoWrap">
              <div className="profileImgWrap">
                <img
                  className="profileImg"
                  src={process.env.PUBLIC_URL + '/images/logo_white.png'}
                />
              </div>
              <p className="profileName">득근득근</p>
            </div>
            <div className="detailInfoWrap">
              <div className="infoNameWrap">
                <p className="infoName">상세 정보</p>
              </div>
              <ul className="detailInfo">
                <li className="detailInfoItem">
                  <p className="infoDetailName">키/몸무게</p>
                  <p className="infoDetail">160/50kg</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">운동종목</p>
                  <p className="infoDetail">헬스</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능지역</p>
                  <p className="infoDetail">서울</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">가능시간</p>
                  <p className="infoDetail">화/목</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">회원수</p>
                  <p className="infoDetail">12</p>
                </li>
                <li className="detailInfoItem">
                  <p className="infoDetailName">활동량</p>
                  <p className="infoDetail">54</p>
                </li>
              </ul>
            </div>
          </section>
          <div className="goPayWrap">
            <p className="cost">180,000 원</p>
            <button type="button" className="goPayBtn">
              결제하기
            </button>
          </div>
          <section className="prWrap">
            <div className="prImgWrap">
              <img src={process.env.PUBLIC_URL + '/images/logo_white.png'} />
            </div>
            <div className="prTextWrap">
              글을 주절거리는 부분 글을 주절거리는 부분 글을 주절거리는 부분
              글을 주절거리는 부분 글을 주절거리는 부분 글을 주절거리는 부분
              글을 주절거리는 부분 글을 주절거리는 부분 글을 주절거리는 부분
              글을 주절거리는 부분 글을 주절거리는 부분 글을 주절거리는 부분
              글을 주절거리는 부분 글을 주절거리는 부분글을 주절거리는 부분
            </div>
          </section>
          <div className="bottomBtnWrap">
            <button type="button" className="goPayBottomBtn">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
