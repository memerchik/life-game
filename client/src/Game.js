import './App.css';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState} from "react";
import SpeedSelector from './SpeedSelector';
import MatrixSize from './MatrixSize';
function Game() {
  const [mousedown, setDown]=useState(false)
  window.onmousedown = () => {
    setDown(true)
  }
  window.onmouseup = () => {
    setDown(false)
  }
  const [matrixSize, changeSize] = useState(20)
  const [play, setPlay] = useState(false)
  const [playSpeed, changePlaySpeed] = useState(500)
  const [gameMode, setGamemode] = useState(null)
  return (
    <div className="App">
      {gameMode==null && (
        <div>
          <h1>Select game mode</h1>
          <button onClick={()=>setGamemode("single")}>Single player</button>
          <button onClick={()=>setGamemode("multi")}>Multiplayer</button>
        </div>
      )}
      {gameMode=="single" && (
      <div>
        <Table play={play} playSpeed={playSpeed} matrixSize={matrixSize} down={mousedown}/>
        <StartBtn play={play} changePlay={setPlay}/>
        <SpeedSelector playSpeed={playSpeed} changePlaySpeed={changePlaySpeed}/>
        <MatrixSize ThisMatrixSize={matrixSize} changeSize={changeSize}/>
        <button onClick={()=>setGamemode(null)}>Return</button>
      </div>
      )}
      
    </div>
  );

}

export default Game;
