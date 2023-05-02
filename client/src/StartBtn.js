import './App.css';
import React, {useState} from "react";
function StartBtn({play, setScore, changePlay, changeMatrix, matrixSize, setHistory, matrix}) {
  function switchPlay(){
    if(play.playState==false && play.startedBefore==false){
      changePlay({
        playState: true,
        startedBefore: true
      })
      let filledCells2 = []

      matrix.map((matrixRow, ind1)=>{
          matrixRow.map((filled, ind2)=>{
              if(filled==1){
                  filledCells2.push({
                      row: ind1,
                      column: ind2
                  })
              }
          })
      })
      let h2 = {
        currentFilled: filledCells2,
        previousFilled1: null,
        previousFilled2: null
      }
      setHistory(h2)
      console.log(h2)
    }
    else if (play.playState==true && play.startedBefore==true){
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
      setHistory({
        currentFilled: null,
        previousFilled1: null,
        previousFilled2: null
      })
      setScore(0)
    }
  }
  return (
    <div className="StartBtn">
      <button onClick={()=>switchPlay()}>{play.playState == true && play.startedBefore==true ? "Pause" : (play.playState==false && play.startedBefore ==false ? "Start" : "Restart")}</button>
    </div>
  );

}

export default StartBtn;
