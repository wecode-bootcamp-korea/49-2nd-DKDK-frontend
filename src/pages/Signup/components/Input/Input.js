import React from 'react';
import './Input.scss';

const Input = props => {
  const nicknameDisabled = props.userData.nickname;
  return (
    <div className="InfoWrap">
      <div className="inputGroup">
        <input
          required=""
          type={props.type}
          className={`inputBox ${props.width}`}
          onChange={e => props.onChange(e)}
          placeholder={props.lable}
          maxLength={props.maxLength}
          name={props.name}
        />
        {props.second === 'true' && (
          <input
            required=""
            type={props.type}
            className={`inputBox ${props.width}`}
            onChange={e => props.onChange(e)}
            placeholder={props.secondLable}
            maxLength={props.maxLength}
            name={props.secondName}
          />
        )}
        {props.btnVisible === 'true' && (
          <button
            onClick={props.onClick}
            className="checkBtn"
            disabled={!nicknameDisabled}
          >
            중복확인
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
