import './App.css';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState, useEffect} from "react";
import SpeedSelector from './SpeedSelector';
import MatrixSize from './MatrixSize';
function Game() {
  const [mousedown, setDown]=useState({
    down: false,
    add: false
  })
  window.onmousedown = (e) => {
    let target = e.target;
    if(target.classList.contains("yellow")){
      setDown({
        down: true,
        add: false
      })
    }
    else{
      setDown({
        down: true,
        add: true
      })
    }
    
  }
  window.onmouseup = () => {
    setDown({
      down: false,
      add: false
    })
  }
  const [matrixSize, changeSize] = useState(20)
  const [play, setPlay] = useState({
    playState: false,
    startedBefore: false
  })
  const [history, setHistory] = useState({
    currentFilled: null,
    previousFilled1: null,
    previousFilled2: null
})
  const [mp, setMP] = useState(null)
  const [playSpeed, changePlaySpeed] = useState(500)
  const [gameMode, setGamemode] = useState(null)
  const [score, setScore] = useState(0)
  const [matrix, changeMatrix] = useState(Array(matrixSize).fill(null).map(()=>Array(matrixSize).fill(0)))
  useEffect(() => {
    if(mp==="AttemptHost"){
      alert("a")
    }
  }, [mp])
  
  
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
        <h1>Your score: {score}</h1>
        <Table play={play} changePlay={setPlay} playSpeed={playSpeed} matrixSize={matrixSize} down={mousedown} setScore={setScore} matrix={matrix} changeMatrix={changeMatrix} history={history} setHistory={setHistory}/>
        <StartBtn play={play} changePlay={setPlay} setScore={setScore} changeMatrix={changeMatrix} matrixSize={matrixSize} setHistory={setHistory} matrix={matrix}/>
        <SpeedSelector playSpeed={playSpeed} changePlaySpeed={changePlaySpeed}/>
        <MatrixSize ThisMatrixSize={matrixSize} changeSize={changeSize}/>
        <button onClick={()=>setGamemode(null)}>Return</button>
      </div>
      )}
      {gameMode=="multi" && (
        <div>
          {mp === null && (
          <div>
            <h1>Multiplayer</h1>
            <button onClick={()=>setMP("AttemptHost")}>Create a game</button>
            <button onClick={()=>setMP("AttemptJoin")}>Join a game</button>
            <input placeholder="gameid"></input>
          </div>
          )}
          {mp === "host" && (
          <div>
            <h1>Your score: {score}</h1>
            <Table play={play} changePlay={setPlay} playSpeed={playSpeed} matrixSize={matrixSize} down={mousedown} setScore={setScore} matrix={matrix} changeMatrix={changeMatrix} history={history} setHistory={setHistory}/>
            <StartBtn play={play} changePlay={setPlay} setScore={setScore} changeMatrix={changeMatrix} matrixSize={matrixSize} setHistory={setHistory} matrix={matrix}/>
            <SpeedSelector playSpeed={playSpeed} changePlaySpeed={changePlaySpeed}/>
            <MatrixSize ThisMatrixSize={matrixSize} changeSize={changeSize}/>
            <button onClick={()=>setGamemode(null)}>Return</button>
          </div>
          )}
        </div>
        
      )}
      
    </div>
  );

}

export default Game;
