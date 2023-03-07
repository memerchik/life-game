import './App.css';
import React, {useRef, useState} from "react";

function MatrixSize({ThisMatrixSize, changeSize}) {
    const a = useRef(null)
    function changeMatrixSize(){
        changeSize(Number(a.current.value))
    }
    return (
    <div className="MatrixSize">
        <input type="number" value={ThisMatrixSize} ref={a} onChange={()=>changeMatrixSize()}></input>
    </div>
    );

}

export default MatrixSize;