import './App.css';
import {useRef} from "react";

function Cell({type, number, click}) {
    let alive = false
    let ref = useRef(null)
    let row = Math.floor(number/18);
    let column = number%18;
    function MyClick(){
        if(alive==true){
            alive=false
            click(row,column, "setDead")
        }
        else{
            alive=true
            click(row,column, "setAlive")
        }
        
    }

    if(type=="yellow"){
        alive = true
        return (
            <div className="Cell yellow" ref={ref} onClick={()=>MyClick()}>
                {number}
            </div>
        );
    }
    else{
        return (
            <div className="Cell" ref={ref} onClick={()=>MyClick()}>
                {number}
            </div>
        );
    }
    
}

export default Cell;