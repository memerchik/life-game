import './App.css';
import Cell from './Cell';
import React, {useState} from "react";

//18*18
function Table({play, int, setInt}) {
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
        setKey((key)=>key+1) // render
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
        setKey((key)=>key+1) // render
    }

    function processMatrix(){
        // let newMatrix = matrix
        // matrix.map((matrixRow, ind1)=>{
        //     matrixRow.map((thisCell, ind2)=>{
                

        //     })
        // })
            
        //
    }
    
    if(play==false){
        console.log("not playing")
        if(int!=null){
            clearInterval(int)
            setInt(null)
        }
        console.log(int)
    }
    else if(play==true){
        console.log("playing")
        if(int==null){
            setInt(setInterval(()=>{
                console.log("a")
            }, 500))
        }
        
        console.log(int)
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