import './App.css';
import Cell from './Cell';
import React, {useState, useEffect} from "react";

//18*18
function Table({play, playSpeed, matrixSize}) {
    console.log(matrixSize)
    const [matrix, changeMatrix] = useState(Array(matrixSize).fill(null).map(()=>Array(matrixSize).fill(0)))

    const [key, setKey] = useState(1) // render

    function countNeighbours(cellRow, cellColumn){
        let neighboursArr=[];

        //default case
        if(cellRow != 0 && cellColumn != 0 && cellRow != matrix.length - 1 && cellColumn!=matrix.length-1){
            for(let i=cellRow-1;i<cellRow+2;i++){
                if(matrix[i][cellColumn-1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn-1
                    })
                }
                if(matrix[i][cellColumn+1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn+1
                    })
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn
                    })
                }
            }
            return neighboursArr
        }

        //if cell is in the first column, but not in the corner
        if(cellRow != 0 && cellRow!=matrix.length-1 && cellColumn == 0){
            for(let i=cellRow-1;i<cellRow+2;i++){
                if(matrix[i][cellColumn+1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn+1
                    })
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn
                    })
                }
            }
            return neighboursArr
        }

        //if cell is in the last column, but not in the corner
        if(cellRow != 0 && cellRow!=matrix.length-1 && cellColumn == matrix.length-1){
            for(let i=cellRow-1;i<cellRow+2;i++){
                if(matrix[i][cellColumn-1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn-1
                    })
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn
                    })
                }
            }
            return neighboursArr
        }

        //if cell is in the first row, but not in the corner
        if(cellRow == 0 && cellColumn != 0 && cellColumn!=matrix.length-1){
            for(let i=cellRow;i<cellRow+2;i++){
                if(matrix[i][cellColumn-1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn-1
                    })
                }
                if(matrix[i][cellColumn+1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn+1
                    })
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn
                    })
                }
            }
            return neighboursArr
        }

        //if cell is in the last row, but not in the corner
        if(cellRow == matrix.length-1 && cellColumn != 0 && cellColumn!=matrix.length-1){
            for(let i=cellRow-1;i<cellRow+1;i++){
                if(matrix[i][cellColumn-1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn-1
                    })
                }
                if(matrix[i][cellColumn+1]==1){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn+1
                    })
                }
                if(matrix[i][cellColumn]==1&&i!=cellRow){
                    neighboursArr.push({
                        row: i,
                        column: cellColumn
                    })
                }
            }
            return neighboursArr
        }

        //if cell is in the top left corner
        if(cellRow == 0 && cellColumn == 0){
            if(matrix[cellRow+1][cellColumn]==1){
                neighboursArr.push({
                    row: cellRow+1,
                    column: cellColumn
                })
            }
            if(matrix[cellRow+1][cellColumn+1]==1){
                neighboursArr.push({
                    row: cellRow+1,
                    column: cellColumn+1
                })
            }
            if(matrix[cellRow][cellColumn+1]==1){
                neighboursArr.push({
                    row: cellRow,
                    column: cellColumn+1
                })
            }
            return neighboursArr
        }

        //if cell is in the top right corner
        if(cellRow == 0 && cellColumn == matrix.length-1){
            if(matrix[cellRow+1][cellColumn]==1){
                neighboursArr.push({
                    row: cellRow+1,
                    column: cellColumn
                })
            }
            if(matrix[cellRow+1][cellColumn-1]==1){
                neighboursArr.push({
                    row: cellRow+1,
                    column: cellColumn-1
                })
            }
            if(matrix[cellRow][cellColumn-1]==1){
                neighboursArr.push({
                    row: cellRow,
                    column: cellColumn-1
                })
            }
            return neighboursArr
        }

        //if cell is in the bottom right corner
        if(cellRow == matrix.length-1 && cellColumn == matrix.length-1){
            if(matrix[cellRow-1][cellColumn]==1){
                neighboursArr.push({
                    row: cellRow-1,
                    column: cellColumn
                })
            }
            if(matrix[cellRow-1][cellColumn-1]==1){
                neighboursArr.push({
                    row: cellRow-1,
                    column: cellColumn-1
                })
            }
            if(matrix[cellRow][cellColumn-1]==1){
                neighboursArr.push({
                    row: cellRow,
                    column: cellColumn-1
                })
            }
            return neighboursArr
        }

        //if cell is in the bottom left corner
        if(cellRow == matrix.length-1 && cellColumn == 0){
            if(matrix[cellRow-1][cellColumn]==1){
                neighboursArr.push({
                    row: cellRow-1,
                    column: cellColumn
                })
            }
            if(matrix[cellRow-1][cellColumn+1]==1){
                neighboursArr.push({
                    row: cellRow-1,
                    column: cellColumn+1
                })
            }
            if(matrix[cellRow][cellColumn+1]==1){
                neighboursArr.push({
                    row: cellRow,
                    column: cellColumn+1
                })
            }
            return neighboursArr
        }      
    }
    

    
    function changeCellBeforeStart(cellRow, cellColumn, action){
        if(play==true){
            return
        }
        //console.log("row:",cellRow, "column:", cellColumn, "action", action)
        if(action=="setAlive"){
            let matrix2 = matrix;
            matrix2[cellRow][cellColumn]=1
            //console.log(countNeighbours(cellRow, cellColumn).length)
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
        setKey((key)=>key+1)
        const interval = setInterval(() => {
            processMatrix(matrix)
        }, playSpeed);
        
        if(play==true){
            return ()=> clearInterval(interval);
        }
        else{
            clearInterval(interval);
        }
        
    }, [play, matrix]);

    useEffect(()=>{
        let newMatrix = Array(matrixSize).fill(null).map(()=>Array(matrixSize).fill(0))
        matrix.map((matrixRow, ind1)=>{
            matrixRow.map((filled, ind2)=>{
                if(ind1<matrixSize&&ind2<matrixSize){
                    newMatrix[ind1][ind2]=matrix[ind1][ind2]
                }
                
            })
        })
        changeMatrix(newMatrix)
    }, [matrixSize])

    //function

    function processMatrix(matrix){
        let newMatrix = Array(matrixSize).fill(null).map(()=>Array(matrixSize).fill(0))
        matrix.map((matrixRow, ind1)=>{
            matrixRow.map((filled, ind2)=>{
                newMatrix[ind1][ind2]=matrix[ind1][ind2]
            })
        })
        let emptyCells = []
        let filledCells = []

        

        
        //sorting cells
        matrix.map((matrixRow, ind1)=>{
            matrixRow.map((filled, ind2)=>{
                let neighbours = countNeighbours(ind1, ind2).length
                //filtering
                if(filled==0 && neighbours!=0){
                    emptyCells.push({
                        row: ind1,
                        column: ind2
                    })
                }
                else if(filled==1){
                    filledCells.push({
                        row: ind1,
                        column: ind2
                    })
                }
        
            })
        })

        //console.log("empty", emptyCells)
        //console.log("filled", filledCells)

        //Check empty cells
        emptyCells.map((thisCell, ind)=>{
            let neighbours = countNeighbours(thisCell.row, thisCell.column)
            if(neighbours.length==3){
                neighbours.map((neighbour)=>{
                    newMatrix[neighbour.row][neighbour.column]=0
                })
                newMatrix[thisCell.row][thisCell.column]=1
            }
        })
        //check filled cells
        filledCells.map((thisCell)=>{
            let neighbours = countNeighbours(thisCell.row, thisCell.column)

            //if cell has 0 or 1 neighbour
            if(neighbours.length==0||neighbours.length==1){
                newMatrix[thisCell.row][thisCell.column]=0
            }

            //if cell has 4 or more neighbours
            if(neighbours.length>=4){
                newMatrix[thisCell.row][thisCell.column]=0
            }

            if(neighbours.length==2||neighbours.length==3){
                newMatrix[thisCell.row][thisCell.column]=1
            }
        })
        changeMatrix(newMatrix)
    }

    return (
      <div className="game-table">
        {matrix.map((matrixRow, ind1)=>(
            matrixRow.map((thisCell, ind2)=>{
                let number = ind1*matrixSize+ind2
                if(thisCell==1){
                    return (<Cell type="yellow" click={changeCellBeforeStart} number={number} row={ind1} col={ind2} matrixSize={matrixSize}/>)
                }
                else{
                    return (<Cell type="grey" click={changeCellBeforeStart} number={number} row={ind1} col={ind2} matrixSize={matrixSize}/>)
                }
            })
        ))}
      </div>
    );
}

export default Table;