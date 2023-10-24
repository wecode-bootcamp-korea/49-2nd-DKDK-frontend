import React, { useState, useRef } from 'react';
import './CommunityPost.scss';
import { useNavigate } from 'react-router-dom/dist';

const CommunityPost = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const navigate = useNavigate();

  const goTolist = () => {
    navigate('/communitylist');
  };
  return (
    <div className="contentsWrap">
      <div className="containerWrap">
        <div className="btnWrap">
          <button className="backbtnWrap">뒤로</button>
        </div>
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
          <p>글을 입력해주세요</p>
          <textarea placeholder="글을 입력해주세요" />
        </div>
        <div className="registBtn">
          <button className="btn" onClick={goTolist}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
export default CommunityPost;
