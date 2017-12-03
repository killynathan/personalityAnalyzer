import React from 'react';

const UserInputForm = ({ name, onSubmit }) => {
  let userInput;
  return (
    <div>
      <p>{name}</p>
      <input
        type="text"
        ref={input => userInput = input}
      />
      <button
        onClick={() => {onSubmit(userInput.value)}}
      >
        Submit
      </button>
    </div>
  );
};

export default UserInputForm;
