import './App.css';
import React, {useState} from "react";
import Game from './Game';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoutes from './PrivateRoute';
import Login from './Login';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Game />} path='/' exact/>
          </Route>
          <Route element={<Login/>} path="/login" />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
