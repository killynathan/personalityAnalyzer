import React from 'react';
import './UserInputForm.css';
import searchIcon from './magnify.svg';

const UserInputForm = ({ name, placeholder, onSubmit }) => {
  let userInput;
  return (
    <div>
      {/* <p>{name}</p> */}
      <form onSubmit={(e) => {e.preventDefault(); onSubmit(userInput.value);}}>
        <div className='UserInputForm-inputContainer'>
          <input
            type="text"
            placeholder={ placeholder }
            ref={input => userInput = input}
            className="UserInputForm-input"
          />
          <img
            src={searchIcon}
            className="UserInputForm-searchIcon"
          />
        </div>
      </form>
    </div>
  );
};

export default UserInputForm;
