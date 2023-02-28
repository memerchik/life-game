import './App.css';
import Cell from './Cell';
import Table from './Table'
import StartBtn from './StartBtn';
import React, {useState} from "react";
import SpeedSelector from './SpeedSelector';
import MatrixSize from './MatrixSize';
import Game from './Game';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
function App() {
  return (
    <Routes>
      <div>aaa</div>
      <Route element={<ProtectedRoutes />}>
        <Route path='/game' element={<Game />}/>
      </Route>
    </Routes>

  );

}

export default App;
