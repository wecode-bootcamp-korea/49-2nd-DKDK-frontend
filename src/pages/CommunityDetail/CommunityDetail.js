import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CommunityDetail.scss';

const CommunityDetail = () => {
  const [data, setData] = useState({});
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState('');
  const [isMine, setIsMine] = useState(false);
  const [isCommentMine, setIsCommentMine] = useState(false);
  const { post_img, post_content, nickname } = data;
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state.postId || 0;
  const token = localStorage.getItem('accessToken');

  console.log(postId);

  const handleContent = e => {
    const text = e.target.value;
    setContent(text);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEST_API}/community/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (res) {
        const postData = res.data.data.post_details;
        if (res.data.message === 'GET_POST') {
          if (res.data.data.isPostedUser) {
            setIsMine(true);
          } else {
            setIsMine(false);
          }

          setData(postData);
        } else {
          alert('오류입니다.');
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEST_API}/community/comment/${postId}`, {
        headers: {
          Authorization: token,
          postId: postId,
        },
      })
      .then(function (res) {
        if (res.data.data.isCommentedUser) {
          setIsCommentMine(true);
        } else {
          setIsCommentMine(false);
        }
        setComment(res.data.data.result);
      });
  }, []);

  const commentPost = () => {
    if (content.length === 0) {
      alert('글을 입력해주세요.');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_TEST_API}/community/comment`,
          { content: content, postId: postId },
          { headers: { Authorization: token } },
        )
        .then(res => {
          if (res.data.message === 'CREATE_COMMENT') {
            axios
              .get(
                `${process.env.REACT_APP_TEST_API}/community/comment/${postId}`,
                {
                  headers: {
                    Authorization: token,
                    postId: postId,
                  },
                },
              )
              .then(function (res) {
                setComment(res.data.data.result);
              });
          }
        });
    }
  };

  const deleteComment = e => {
    const commentId = Number(e.target.value);
    const id = { postId: postId, commentId: commentId };
    axios
      .delete(`${process.env.REACT_APP_TEST_API}/community/comment`, {
        headers: { Authorization: token },
        data: id,
      })
      .then(res => {
        if (res.data.message === 'DELETE_COMMENT') {
          setComment(comment.filter(el => el.comment_id !== commentId));
        } else {
          alert('삭제가 실패하였습니다.');
        }
      });
  };

  const deletePost = () => {
    const id = { postId: postId };
    axios
      .delete(`${process.env.REACT_APP_TEST_API}/community/post`, {
        headers: { Authorization: token },
        data: id,
      })
      .then(res => {
        if (res.data.message === 'DELETE_POST') {
          navigate('/communityList');
        } else {
          alert('삭제가 실패하였습니다.');
        }
      });
  };

  return (
    <div className="contentsWrap">
      <div className="detailWrap">
        <div className="btnWrap">
          {isMine && (
            <button
              type="button"
              className="contentDelete"
              onClick={deletePost}
            >
              삭제하기
            </button>
          )}
        </div>
        <div className="imgWrap">
          {post_img ? (
            <img src={`${post_img}`} alt="게시글 이미지" />
          ) : (
            <img src="/images/logo_white.png" alt="기본이미지" />
          )}
        </div>
        <section className="content">
          <p className="name">{nickname}</p>
          <div className="text">{post_content}</div>
        </section>
        <section className="commentWrap">
          <div className="commentInput">
            <input
              type="text"
              placeholder="댓글을 입력해주세요."
              onChange={handleContent}
            />
            <button type="button" className="postComment" onClick={commentPost}>
              등록하기
            </button>
          </div>
          <ul className="commentList">
            {comment.map(comment => {
              return (
                <li className="commentItem" key={comment.comment_id}>
                  <div className="leftWrap">
                    {comment.user_img_url ? (
                      <img src={comment.user_img_url} alt="유저 프로필" />
                    ) : (
                      <img src="/images/logo_white.png" alt="기본이미지" />
                    )}
                    <p className="comment">{comment.nickname}</p>
                    <p className="comment">{comment.content}</p>
                  </div>
                  {isCommentMine && (
                    <button
                      type="button"
                      className="deleteBtn"
                      value={comment.comment_id}
                      onClick={deleteComment}
                    >
                      x
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CommunityDetail;
