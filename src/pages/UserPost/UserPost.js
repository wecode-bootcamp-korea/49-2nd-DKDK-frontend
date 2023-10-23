import React from 'react';
import './UserPost.scss';

const UserPost = () => {
  return (
    <div className="contentsWrap">
      <div className="container">
        <div className="section">
          <div className="rowSection">
            <div className="section">
              <div className="firstMessage">
                <img
                  className="running"
                  src="/images/running.jpg"
                  alt="달리기"
                />
                <div className="bodyBox">
                  <div className="title">
                    <a href="./PostDetail">러닝에 대해서...</a>
                  </div>
                  <span className="postContent">
                    첫째, 러닝을 하면 체지방이 줄고 근육량이 늘면서 체격이
                    좋아질 뿐만 아니라 바이러스로부터 견뎌낼 수 있는 방어 체력이
                    향상된다.
                    <br /> 둘째, 다른 운동보다 스트레스 해소에 좋다. 누구나
                    장거리를 한바탕 달리고 나면 상쾌해지는 기분을 느낄 수 있다.{' '}
                    <br />
                    셋째, 체중 감량에 효과적이다.
                  </span>
                  <div>
                    <img src="/images/like.png" alt="좋아요" />
                    {<span className="number">10</span> /*기능구현 예정 */}
                    <img src="/images/comment.png" alt="댓글" />
                    {<span className="number">5</span> /*기능구현 예정 */}
                  </div>
                </div>
              </div>
              <div className="secondMessage">
                <img
                  className="training"
                  src="/images/training.jpg"
                  alt="헬스트레이닝"
                />
                <div className="bodyBox">
                  <div className="title">
                    <a href="./PostDetail">웨이트 트레이닝의 중요성</a>
                  </div>
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
                    {
                      <span className="number">
                        10
                      </span> /*기능구현 예정 위와 같음 */
                    }
                    <img src="/images/comment.png" alt="댓글" />
                    {
                      <span className="number">
                        5
                      </span> /*기능구현 예정 위와 같음  */
                    }
                  </div>
                </div>
                <button>
                  <a href="./PostSignup">글쓰기</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
