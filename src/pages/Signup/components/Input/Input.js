import React from 'react';
import './Input.scss';

const Input = ({
  lable,
  name,
  width,
  onChange,
  useBtn,
  onClick,
  type,
  userData,
  maxLength,
  useSecond,
  secondLable,
  secondName,
}) => {
  return (
    <div className="InfoWrap">
      <div className="inputGroup">
        <input
          required=""
          type={type}
          className={`inputBox ${width}`}
          onChange={e => onChange(e)}
          placeholder={lable}
          maxLength={maxLength}
          name={name}
        />
        {useSecond && (
          <input
            required=""
            type={type}
            className={`inputBox ${width}`}
            onChange={e => onChange(e)}
            placeholder={secondLable}
            maxLength={maxLength}
            name={secondName}
          />
        )}
        {useBtn && (
          <button
            onClick={onClick}
            className="checkBtn"
            disabled={!userData.nickname}
          >
            중복확인
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
