import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function Login() {
    const [usernameReg, setUsernameReg] = useState()
    const [passwordReg, setPasswordReg] = useState()
    const [usernameLog, setUsernameLog] = useState()
    const [passwordLog, setPasswordLog] = useState()
    const [loginStatus, setLogin] = useState()

    Axios.defaults.withCredentials = true;

    const register = ()=>{
        Axios.post("http://localhost:3001/register",
        {
            username: usernameReg,
            password: passwordReg
        }).then((res)=>{
            console.log(res)
        })
    }

    const login = ()=>{
        Axios.post("http://localhost:3001/login",
        {
            username: usernameLog,
            password: passwordLog
        }).then((res)=>{
            console.log(res)
            if(res.data.message){
                setLogin(res.data.message)
            }
            else{
                setLogin(res.data[0].username)
            }
        })
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((res)=>{
            if(res.data.loggedin == true){
                setLogin(res.data.user[0].username)
            }
            else{
                setLogin("Not logged in")
            }
        })
    }, [])

    return (
        <div className='LoginPage'>
            <div className='Registration'>
                <input type="text" id="regUsername" onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                <input type="text" id="regPassword" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <button onClick={register}>Register</button>
            </div>
            <div className='Login'>
                <input type="text" id="logUsername" onChange={(e)=>{setUsernameLog(e.target.value)}}/>
                <input type="text" id="logPassword" onChange={(e)=>{setPasswordLog(e.target.value)}}/>
                <button onClick={login}>Login</button>
            </div>
            <div>{loginStatus}</div>
        </div>
    )
}

export default Login