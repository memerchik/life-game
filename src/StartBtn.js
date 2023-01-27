import './App.css';
import React, {useState} from "react";
function StartBtn({play, changePlay}) {
  function switchPlay(){
    if(play==true){
      changePlay(false)
    }
    else{
      changePlay(true)
    }
  }
  return (
    <div className="StartBtn">
      <button onClick={()=>switchPlay()}>Start the game</button>
    </div>
  );

}

export default StartBtn;
