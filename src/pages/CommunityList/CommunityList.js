import React, { useState, useEffect } from 'react';
import './CommunityList.scss';

const CommunityList = () => {
  /*const [data, setData] = useState([]);

  useEffect(() => {
    feach('#/data/CommunityPost.json') //<-- 백엔드 로컬주소 받아야함
      .then(res => res.json())
      .then(result => setData(result.data));
  }, []);*/

  // 1. 백엔드와 mock데이터 형태 확인 및 조정
  // 2. data state에 map 메서드 활용하여 각 요소들 화면에 그려주기

  return (
    <div className="contentsWrap">
      <div className="container">
        <div className="section">
          <div className="rowSection">
            <div className="section">
              <div className="firstMessage">
                <img
                  className="filates"
                  src="/images/filates.jpg"
                  alt="달리기"
                />
                <div className="bodyBox">
                  <div className="title">필라테스는..</div>
                  <span className="postContent">
                    첫째, 짧은 시간에 군살을 뺄 수 있다.
                    <br />
                    둘째, 코어 근육에 힘을 주며 단련을 하기 때문에 자세 교정에
                    도움이 된다.
                    <br />
                    셋째, 재활 치료가 가능하다. 거북목, 허리디스크, 휜 다리 교정
                    등을 치료하는데 도움을 주며 치료 뿐만 아니라 예방도
                    가능하다.
                    <br />
                    넷째, 어디서나 가능하다. 필라테스는 다양한 도구를 이용 하기
                    때문에 특별한 장소 제한 없이 운동할 수 있다는 점이
                    매력적이다.
                  </span>
                  <div>
                    <img src="/images/like.png" alt="좋아요" />
                    <span className="number">10개</span>
                    <img src="/images/comment.png" alt="댓글" />
                    <span className="number">5개</span>
                  </div>
                </div>
              </div>
              <div className="secondMessage">
                <img
                  className="running"
                  src="/images/running.jpg"
                  alt="달리기"
                />
                <div className="bodyBox">
                  <div className="title">러닝에 대해서...</div>
                  <span className="postContent">
                    첫째, 러닝을 하면 체지방이 줄고 근육량이 늘면서 체격이
                    좋아질 뿐만 아니라 바이러스로부터 견뎌낼 수 있는 방어 체력이
                    향상된다.
                    <br /> 둘째, 다른 운동보다 스트레스 해소에 좋다. 누구나
                    장거리를 한바탕 달리고 나면 상쾌해지는 기분을 느낄 수 있다.
                    <br />
                    셋째, 체중 감량에 효과적이다.
                  </span>
                  <div>
                    <img src="/images/like.png" alt="좋아요" />
                    <span className="number">10개</span>
                    <img src="/images/comment.png" alt="댓글" />
                    <span className="number">5개</span>
                  </div>
                </div>
              </div>
              <div className="thirdMessage">
                <img
                  className="training"
                  src="/images/training.jpg"
                  alt="헬스트레이닝"
                />
                <div className="bodyBox">
                  <div className="title">웨이트 트레이닝의 중요성</div>
                  <span className="postContent">
                    첫째, 부상의 위험에서 벗어날 수 있다. 혼자서 부정확한
                    동작으로 무거운 무게를 들 경우 모든관절과 근육인대에 손상을
                    줄 수 있다.
                    <br />
                    둘째, 운동습관의 형성이다. 체계적인관리와 꾸준한 코칭을 받을
                    수 있다.
                    <br />
                    셋째, 시너지효과를 나타낼 수 있다. 대부분의 운동은 함께할 때
                    더 큰 효과를 나타낸다.
                  </span>
                  <div>
                    <img src="/images/like.png" alt="좋아요" />

                    <span className="number">10개</span>

                    <img src="/images/comment.png" alt="댓글" />

                    <span className="number">5</span>
                  </div>
                </div>
                <button>글쓰기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
