import './App.css';
import React, {useRef, useState} from "react";
function SpeedSelector({playSpeed, changePlaySpeed}) {
    const a = useRef(null)
    function speedChange(){
        changePlaySpeed(a.current.value)
    }
    return (
    <div className="Speed">
        <p>Current speed: {playSpeed/1000} s</p>
        <input type="range" onChange={()=>speedChange()} min={10} max={2000} step={10} value={playSpeed} ref={a}></input>
    </div>
    );

}

export default SpeedSelector;