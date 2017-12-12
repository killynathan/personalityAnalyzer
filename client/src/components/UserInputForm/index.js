import React from 'react';
import './UserInputForm.css';
import searchIcon from './magnify.svg';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const UserInputForm = ({ name, placeholder, onSubmit }) => {
  let userInput;
  let select;
  
  return (
    <div>
      {/* <p>{name}</p> */}
      <form onSubmit={(e) => {e.preventDefault(); onSubmit(userInput.value, select.value);}}>
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
          <select
            className="UserInputForm-select"
            ref={elem => select = elem}
          >
            <option className="UserInputForm-option" value="twitter">Twitter</option>
            <option className="UserInputForm-option" value="reddit">Reddit</option>
          </select>
          {/*<Select
            name="form-field-name"
            value={mode}
            clearable={false}
            searchable={false}
            onChange={onChangeMode}
            className="UserInputForm-select"
            options={[
              { value: 'twitter', label: 'Twitter', className: 'UserInputForm-option'},
              { value: 'reddit', label: 'Reddit', className: 'UserInputForm-option' },
            ]}
          />*/}
        </div>
      </form>
    </div>
  );
};

export default UserInputForm;
