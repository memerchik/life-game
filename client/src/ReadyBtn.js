import './App.css';
import React, {useState} from "react";
import Axios from 'axios'
function ReadyBtn({play, changePlay, setHistory, matrix}) {
  function switchPlay(){
    if(play.playState==false && play.startedBefore==false && play.multiplayerLock == false){
      changePlay({
        playState: false,
        startedBefore: false,
        multiplayerLock: true
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
      Axios.post("http://localhost:3001/play", {
        action: "setReady",

        headers:{
          "x-access-token": localStorage.getItem("token")
        },

      })
    }
    
    else if(play.playState==false && play.startedBefore==true && play.multiplayerLock==true){
      Axios.post("http://localhost:3001/deleteGame", {
        headers:{
          "x-access-token": localStorage.getItem("token")
        },

      })
    }
    console.log(play)
  }
  return (
    <div className="StartBtn">
      <button onClick={()=>switchPlay()}>{play.playState==true ? "Playing" : (play.playState==false && play.multiplayerLock == true ? "Waiting for other player" : (play.playState==false && play.multiplayerLock == false) ? "Ready" : "Finish")}</button>
    </div>
  );

}

export default ReadyBtn;
