import './App.css';
import Cell from './Cell';
import React, {useState, useEffect} from "react";

//18*18
function Table({play}) {
    const [matrix, changeMatrix] = useState(Array(18).fill(null).map(()=>Array(18).fill(0)))
    const [key, setKey] = useState(1) // render

    function countNeighbours(cellRow, cellColumn){
        let neighboursCount=0;
        if(cellRow != 0 && cellColumn != 0 && cellRow != matrix.length - 1 && cellColumn!=matrix.length-1){
            for(let i=cellRow-1;i<cellRow+2;i++){
                if(matrix[i][cellColumn-1]==1){
                    neighboursCount++;
                }
                if(matrix[i][cellColumn+1]==1){
                    neighboursCount++;
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursCount++;
                }
            }
        }
        return neighboursCount
    }
    

    
    function changeCellBeforeStart(cellRow, cellColumn, action){
        if(play==true){
            return
        }
        //console.log("row:",cellRow, "column:", cellColumn, "action", action)
        if(action=="setAlive"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=1
            changeMatrix(matrix2)
            console.log(countNeighbours(cellRow, cellColumn))
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

    //Play/Stop switch
    useEffect(() => {
        const interval = setInterval(() => {
            //function call here
            console.log('This will be called every 2 seconds');
        }, 500);
        
        if(play==true){
            return ()=> clearInterval(interval);
        }
        else{
            clearInterval(interval);
        }
        
    }, [play]);

    //function

    function processMatrix(){
        let newMatrix = matrix

        

        

        matrix.map((matrixRow, ind1)=>{
            matrixRow.map((thisCell, ind2)=>{
                //Checks if cell has to die

                //check 1

                
            })
        })
        

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