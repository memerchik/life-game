import './App.css';
import Cell from './Cell';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState} from "react";
function App() {
  
  const [play, setPlay] = useState(false)
  const [intervall, sett] = useState(null)
  return (
    <div className="App">
      <Table play={play} int = {intervall} setInt={sett}/>
      <StartBtn play={play} changePlay={setPlay}/>
    </div>
  );

}

export default App;
