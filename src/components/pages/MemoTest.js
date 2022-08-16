import React from "react";
import './MemoTest.css'


function Square(props) {
  return (
    <div className={`memotest-square ${props.color}`} >

    </div>
  );
}

export default function MemoTest() {



  return (
    <div className="memotest">
      <div className='memotest-row'>
        <Square color='red' />
        <Square color='blue' />
        <Square />
        <Square />
      </div><div className='memotest-row'>
        <Square />
        <Square />
        <Square />
        <Square />
      </div><div className='memotest-row'>
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}