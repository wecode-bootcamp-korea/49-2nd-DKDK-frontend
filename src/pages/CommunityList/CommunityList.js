import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CommunityList.scss';

const CommunityList = () => {
  const [data, setData] = useState([]);
  //const [page, setPage] = useState(1);
  //const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios
      .get('http://10.58.52.79:8000/community/', {
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
      .then(function (res) {
        setData([res.data.data]);
        console.log(res);
      });
  }, []);

  const navigate = useNavigate();

  const goTowhite = () => {
    navigate('/communitypost');
  };
  const goTodetail = () => {
    navigate('/communitydetail');
  };

  // useEffect(() => {
  //   const axiosData = () => {
  //     const nowUrl = `offset=${offset}&limit=3`;
  //     axios(`https://dummyjson.com/products?${nowUrl}`).then(
  //       function (response) {
  //         setData(prevData => prevData.concat(response.data.products));
  //       },
  //     );
  //   };
  //   axiosData();
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } =
  //       document.documentElement;
  //     if (scrollHeight - scrollTop === clientHeight) {
  //       if (data.length === page * 3) {
  //         setOffset(page * 3);
  //         setPage(page + 1);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="contentsWrap">
      <div className="container">
        <button className="writeBtn" onClick={goTowhite}>
          글쓰기
        </button>
        <div className="section">
          <div className="rowSection">
            <div className="section">
              {data.map(item => (
                <div className="firstMessage">
                  <div className="bodyBox">
                    <div className="top">
                      <span className="name">{item.nickname}</span>
                      <span className="bar">/</span>
                      <span className="date">{item.post_create_at}</span>
                    </div>
                    <div>
                      <img src={item.img_url} alt="사진" />
                    </div>
                    <div className="title">{item.title}</div>
                    <span className="textContent" onClick={goTodetail}>
                      {item.post_content}
                    </span>
                  </div>
                  <div className="contentIcon">
                    <img className="like" src="images/like.png" alt="좋아요" />
                    <span className="number">{item.likeCount}</span>
                    <div className="contentIcon">
                      <img
                        className="comment"
                        src="images/comment.png"
                        alt="댓글"
                      />
                      <span className="number">{item.commentCount}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="secondMessage">
                <div className="bodyBox">
                  <div className="top">
                    <span className="name">룰루랄라</span>
                    <span className="bar">/</span>
                    <span className="date">2023.10.23</span>
                  </div>
                  <div className="title">러닝 / 유산소운동</div>
                  <span className="textContent" onClick={goTodetail}>
                    첫째, 러닝을 하면 체지방이 줄고 근육량이 늘면서 체격이
                    좋아질 뿐만 아니라 바이러스로부터 견뎌낼 수 있는 방어 체력이
                    향상된다. <br />
                    둘째, 다른 운동보다 스트레스 해소에 좋다. 누구나 장거리를
                    한바탕 달리고 나면 상쾌해지는 기분을 느낄 수 있다.
                    <br />
                    셋째, 체중 감량에 효과적이다.
                  </span>
                </div>
                <div className="contentIcon">
                  <img className="like" src="images/like.png" alt="좋아요" />
                  <span className="number">10개</span>
                  <div className="contentIcon">
                    <img
                      className="comment"
                      src="images/comment.png"
                      alt="댓글"
                    />
                    <span className="number">10개</span>
                  </div>
                </div>
              </div> */}

              {/* <div className="thirdMessage">
                <div className="bodyBox">
                  <div className="top">
                    <span className="name">개발자</span>
                    <span className="bar">/</span>
                    <span className="date">2023.10.24</span>
                  </div>
                  <div className="title">웨이트 트레이닝</div>
                  <span className="textContent" onClick={goTodetail}>
                    첫째, 부상의 위험에서 벗어날 수 있다. 혼자서 부정확한
                    동작으로 무거운 무게를 들 경우 모든관절과 근육인대에 손상을
                    줄 수 있다. <br />
                    둘째, 운동습관의 형성이다. 체계적인관리와 꾸준한 코칭을 받을
                    수 있다. <br />
                    셋째, 시너지효과를 나타낼 수 있다. 대부분의 운동은 함께할 때
                    더 큰 효과를 나타낸다.
                  </span>
                </div>
              </div> 
              <div className="contentIcon">
                <img className="like" src="images/like.png" alt="좋아요" />
                <span className="number">10개</span>
                <div className="contentIcon">
                  <img
                    className="comment"
                    src="images/comment.png"
                    alt="댓글"
                  />
                  <span className="number">10개</span>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
