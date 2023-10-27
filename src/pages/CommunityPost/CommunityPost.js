import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CommunityPost.scss';

const CommunityPost = () => {
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const navigate = useNavigate();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleContent = e => {
    const text = e.target.value;
    setContent(text);
  };

  const post = () => {
    const token = localStorage.getItem('accessToken');

    if (content.length === 0) {
      alert('글을 입력해주세요.');
    } else {
      axios
        .post(
          'http://10.58.52.122:8000/community/post',
          { content: content },
          { headers: { Authorization: token } },
        )
        .then(res => {
          if (res.data.message === 'CREATE_POST') {
            alert('등록이 완료되었습니다.');
            navigate('/communityList');
          } else {
            alert('오류입니다.');
          }
        });
    }
  };

  const goTolist = () => {
    navigate('/communitylist');
  };

  return (
    <div className="contentsWrap">
      <div className="containerWrap">
        <div className="imgWrap">
          <label className="imgLabel" htmlFor="profileImg">
            {imgFile ? (
              <img src={imgFile} />
            ) : (
              <img src="/images/logo_white.png" />
            )}
            <span className="click">클릭</span>
          </label>
          <input
            className="imgInput"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </div>
        <div className="contentWrapper">
          <textarea placeholder="글을 입력해주세요" onChange={handleContent} />
        </div>
      </div>
      <div className="registBtn">
        <button className="btn" onClick={post}>
          등록
        </button>
      </div>
    </div>
  );
};
export default CommunityPost;
