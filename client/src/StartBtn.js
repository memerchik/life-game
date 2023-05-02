import './App.css';
import React, {useState} from "react";
function StartBtn({play, changePlay, changeMatrix, matrixSize}) {
  function switchPlay(){
    if(play.playState==false && play.startedBefore==false){
      changePlay({
        playState: true,
        startedBefore: true
      })
    }
    else if (play.playState==true && playState.startedBefore==true){
      changePlay({
        playState: false,
        startedBefore: true
      })
    }
    else if (play.playState==false && play.startedBefore==true){
      changePlay({
        playState: false,
        startedBefore: false
      })
      let newMatrix = Array(matrixSize).fill(null).map(()=>Array(matrixSize).fill(0))
      changeMatrix(newMatrix)
    }
  }
  return (
    <div className="StartBtn">
      <button onClick={()=>switchPlay()}>{play.playState == true && play.startedBefore==true ? "Pause" : (play.playState==false && play.startedBefore ==false ? "Start" : "Restart")}</button>
    </div>
  );

}

export default StartBtn;
