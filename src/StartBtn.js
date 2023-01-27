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
      <button onClick={()=>switchPlay()}>Start the game {play == true ? "started" : "not started"}</button>
    </div>
  );

}

export default StartBtn;
