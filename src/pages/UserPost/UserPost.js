import React from 'react';
import './UserPost.scss';

const UserPost = () => {
  return (
    <div className="contentsWrap">
      <div className="postList">
        <div className="container">
          <div className="post">
            <div className="userPost">
              <img src="/images/user.png" alt="user" />
              <span className="userName">홍길동</span>;
            </div>
            <div className="content">
              <span className="postContent">3팀입니다!!</span>
            </div>
          </div>
          <div className="post">
            <div className="userPost">
              <img src="/images/user.png" alt="user" />
              <span className="userName">홍길동</span>;
            </div>
            <div className="content">
              <span className="postContent">3팀입니다!!</span>
            </div>
          </div>
          <div className="post">
            <div className="userPost">
              <img src="/images/user.png" alt="user" />
              <span className="userName">홍길동</span>;
            </div>
            <div className="content">
              <span className="postContent">3팀입니다!!</span>
            </div>
          </div>
          <div className="buttonWrapper">
            <label>
              <input type="checkbox" />내 글보기
            </label>
            <button className="writeButton">글 쓰기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
