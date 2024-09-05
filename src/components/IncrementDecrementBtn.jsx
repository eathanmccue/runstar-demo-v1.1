import React, { useState } from "react";
import "./IncrementDecrementBtn.css";


function IncrementDecrementBtn({ id, updateCount, minValue = 0, maxValue = 1000, defaultValue }){
  let startingValue = minValue;

  if(defaultValue){
    startingValue = Number(defaultValue);
  }

  const [count, setCount] = useState(startingValue);

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.value < minValue){
        setCount(minValue)
        updateCount(id, parseInt(minValue));
    }

    else if (event.target.value > maxValue){
        setCount(maxValue)
        updateCount(id, parseInt(maxValue));
        
    }else{
    setCount(event.target.value);
    updateCount(id, parseInt(event.target.value));
    
    }
  }

  const handleIncrementCounter = (event) => {
    event.preventDefault();

    if (count < maxValue) {
      setCount((prevState) => parseInt(prevState, 10) + 1);
      updateCount(id, parseInt(parseInt(count)+1*1));
    }
  };

  const handleDecrementCounter = (event) => {
    event.preventDefault();
    
    if (count > minValue) {
      setCount((prevState) => parseInt(prevState, 10) - 1);
      updateCount(id, parseInt(count)-1*1);
    }
  };

  return (
    
    <div className="btn-group">
        <input type="number" value = {count} onChange={handleChange}/>
            <div className="incdec">
                <button className="increment-btn" onClick={handleIncrementCounter}><span>+</span></button>
                <button className="decrement-btn" onClick={handleDecrementCounter}><span>-</span></button>
            </div>
    </div>
  );
};

export default IncrementDecrementBtn;