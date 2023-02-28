import './App.css';
import Cell from './Cell';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState} from "react";
import SpeedSelector from './SpeedSelector';
import MatrixSize from './MatrixSize';
function App() {
  const [rnd, render] = useState(0)
  const [matrixSize, changeSize] = useState(20)
  const [play, setPlay] = useState(false)
  const [playSpeed, changePlaySpeed] = useState(500)
  return (
    <div className="App">
      <Table play={play} playSpeed={playSpeed} matrixSize={matrixSize}/>
      <StartBtn play={play} changePlay={setPlay}/>
      <SpeedSelector playSpeed={playSpeed} changePlaySpeed={changePlaySpeed}/>
      <MatrixSize ThisMatrixSize={matrixSize} changeSize={changeSize}/>
    </div>
  );

}

export default App;
