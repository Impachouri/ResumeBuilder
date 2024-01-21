import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";

const Comp2 = ({ type, id, name, defaultValue, handleInputChange }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={defaultValue}
      onChange={handleInputChange}
    />
  );
};

const Comp1 = () => {
  const [arr, setArr] = useState(['value1', 'value2', 'value3']);
  const [activeValue, setActiveValue] = useState(0);

  const handleClick = () => {
    console.log("click ")
    setActiveValue((preValue) => (preValue + 1) % arr.length);
  };

  const handleInputChange = (content) => {
    const newArr = [...arr]; 
    newArr[activeValue] = content;
    setArr(newArr); 
  };

  return (
    <div className="flex place-items-center justify-center m-44 text-black gap-3">
      <ul>
        {arr.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Change</button>
      <TextEditor 
        label="Responsibility" 
        id={activeValue}
        value={arr[activeValue]} 
        handleTextArea={ handleInputChange }
      />
      {/* <TextEditor
        // type="text"
        label="Testing"
        id={activeValue}
        // name={activeValue}
        // value={arr[activeValue]}
        handleTextArea={handleInputChange}
      /> */}
    </div>
  );
};

export default Comp1;
