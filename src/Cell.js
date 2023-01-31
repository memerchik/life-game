import './App.css';
import {useRef} from "react";

function Cell({type, number, click, matrixSize}) {
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

    if(type=="yellow"){
        alive = true
        return (
            <div className="Cell yellow" ref={ref} onClick={()=>MyClick()} style={{height: cellSize, width: cellSize}}>
                {number}
            </div>
        );
    }
    else{
        return (
            <div className="Cell" ref={ref} onClick={()=>MyClick()} style={{height: cellSize, width: cellSize}}>
                {number}
            </div>
        );
    }
    
}

export default Cell;