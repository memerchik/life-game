import './App.css';
import Cell from './Cell';
import React, {useState} from "react";

//18*18
function Table({play, interval, changeInterval}) {
    const [matrix, changeMatrix] = useState(Array(18).fill(null).map(()=>Array(18).fill(0)))
    const [key, setKey] = useState(1) // render

    
    function changeCellBeforeStart(cellRow, cellColumn, action){
        if(play==true){
            return
        }
        //console.log("row:",cellRow, "column:", cellColumn, "action", action)
        if(action=="setAlive"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=1
            changeMatrix(matrix2)
        }
        if(action=="setDead"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=0
            changeMatrix(matrix2)
        }
        setKey(key+1) // render
    }

    function changeCell(cellRow, cellColumn, action){
        if(play!=true){
            return
        }
        //console.log("row:",cellRow, "column:", cellColumn, "action", action)
        if(action=="setAlive"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=1
            changeMatrix(matrix2)
        }
        if(action=="setDead"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=0
            changeMatrix(matrix2)
        }
        setKey(key+1) // render
    }

    function processMatrix(){
        let newMatrix = matrix
        matrix.map((matrixRow, ind1)=>{
            matrixRow.map((thisCell, ind2)=>{
                console.log(thisCell)





            })
        })
            
        //
    }

    if(play==true){
        if(interval==false){
            var mainTimer = setInterval(()=>{
                processMatrix()
            }, 500)
            changeInterval(true)
        }
    }
    else if(play==false){
        if(interval==true){
            clearInterval(mainTimer)
            changeInterval(false)
        }
    }

    return (
      <div className="game-table">
        {matrix.map((matrixRow, ind1)=>(
            matrixRow.map((thisCell, ind2)=>{
                let number = ind1*18+ind2
                if(thisCell==1){
                    return (<Cell type="yellow" click={changeCellBeforeStart} number={number}/>)
                }
                else{
                    return (<Cell type="grey" click={changeCellBeforeStart} number={number}/>)
                }
            })
        ))}
      </div>
    );
}

export default Table;