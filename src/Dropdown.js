import React from 'react';
import './dropdown.css';

function Dropdown(props) {
  const {posX, posY, clickFunc, chars} = props;
  if (posX === -1 || posY === -1)
    return null;
  return (
    <div className="dropdown" style={{left: `${posX}px`, top: `${posY}px`}}>
      {chars.map((char, idx) => {
        return (
          <button key={idx} onClick={clickFunc} idx={idx}>{char}</button>
        )
      })}
    </div>
  )
}

export default Dropdown;