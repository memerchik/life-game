import './App.css';
import Cell from './Cell';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState} from "react";
import SpeedSelector from './SpeedSelector';
import MatrixSize from './MatrixSize';
function App() {
  const [mousedown, setDown]=useState(false)
  window.onmousedown = () => {
    setDown(true)
  }
  window.onmouseup = () => {
    setDown(false)
  }
  const [rnd, render] = useState(0)
  const [matrixSize, changeSize] = useState(20)
  const [play, setPlay] = useState(false)
  const [playSpeed, changePlaySpeed] = useState(500)
  return (
    <div className="App">
      <div>{mousedown == true ? "Down" : "Up"}</div>
      <Table play={play} playSpeed={playSpeed} matrixSize={matrixSize} down={mousedown}/>
      <StartBtn play={play} changePlay={setPlay}/>
      <SpeedSelector playSpeed={playSpeed} changePlaySpeed={changePlaySpeed}/>
      <MatrixSize ThisMatrixSize={matrixSize} changeSize={changeSize}/>
    </div>
  );

}

export default App;
