import './App.css';
import {useRef} from "react";

function Cell({type, number, click, matrixSize, col, cellRow, down}) {
    let cellSize = 800/matrixSize+"px"
    let alive = false
    let ref = useRef(null)
    let row = Math.floor(number/matrixSize);
    let column = number%matrixSize;
    function MyClick(){
        if(alive==true){
            alive=false
            click(row, column, "setDead")
        }
        else{
            alive=true
            click(row, column, "setAlive")
        }
    }

    function onHover(){
        if(down&&alive==false){
            alive=true
            click(row, column, "setAlive")
        }
    }

    

    if(type=="yellow"){
        alive = true
        return (
            <div onMouseMove={()=>onHover()} className="Cell yellow" ref={ref} onClick={()=>MyClick()} style={{height: cellSize, width: cellSize}} num={number} row={cellRow} col={col}>
            </div>
        );
    }
    else{
        return (
            <div onMouseMove={()=>onHover()} className="Cell" ref={ref} onClick={()=>MyClick()} style={{height: cellSize, width: cellSize}} num={number} row={cellRow} col={col}>
            </div>
        );
    }
    
}

export default Cell;