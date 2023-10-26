import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CommunityList.scss';

const CommunityList = () => {
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios
      .get(`${process.env.REACT_APP_TEST_API}/community/`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (res) {
        if (res.data.message === 'GET_POST') {
          setData(res.data.data);
        }
        console.log(res);
      });
  }, []);

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

  const goWrite = () => {
    navigate('/communitypost');
  };
  const goDetail = e => {
    const postId = e.currentTarget.getAttribute('data-id');
    navigate('/communitydetail', { state: { postId: postId } });
  };

  return (
    <div className="contentsWrap">
      <div className="container">
        <button className="writeBtn" onClick={goWrite}>
          글쓰기
        </button>
        <div className="section">
          <div className="rowSection">
            <div className="section">
              {data.map(item => {
                return (
                  <div
                    className="firstMessage"
                    key={item.post_id}
                    data-id={item.post_id}
                    onClick={goDetail}
                  >
                    <div className="bodyBox">
                      <div className="topWrap">
                        <span className="name">
                          {item.nickname} / {item.post_create_at}
                        </span>
                      </div>
                      <div>
                        <img src={item.img_url} alt="사진" />
                      </div>
                      <p className="textContent">{item.post_content}</p>
                    </div>
                    <div className="contentIcon">
                      <img
                        className="like"
                        src="images/like.png"
                        alt="좋아요"
                      />
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
