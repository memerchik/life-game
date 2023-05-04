import './Login.css'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function Login() {
    const [usernameReg, setUsernameReg] = useState()
    const [passwordReg, setPasswordReg] = useState()
    const [usernameLog, setUsernameLog] = useState()
    const [passwordLog, setPasswordLog] = useState()
    const [loginStatus, setLogin] = useState(false)
    

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("http://192.168.6.17:3001/register",
        {
            username: usernameReg,
            password: passwordReg
        }).then((res)=>{
            console.log(res)
        })
    }

    const login = () => {
        Axios.post("http://192.168.6.17:3001/login",
        {
            username: usernameLog,
            password: passwordLog
        }).then((res)=>{
            console.log(res)
            if(res.data.message){
                setLogin(false)
            }
            else{
                localStorage.setItem("token", res.data.token)
                setLogin(true)
            }
        })
    }

    useEffect(() => {
        let loggedin = null
        Axios.get("http://192.168.6.17:3001/login").then((res)=>{
            if(res.data.loggedin == true){
                setLogin(true)
                loggedin=true
            }
            else{
                setLogin(false)
                loggedin=false
            }
        })
        .then(()=>{
            if(loggedin==true){
                Axios.get("http://192.168.6.17:3001/isUserAuth", {
                    headers:{
                        "x-access-token": localStorage.getItem("token")
                    }
                }).then((response)=>{
                    console.log(response)
                })
            }
        })
    }, [])

    const userAuthenticated = () => {
        Axios.get("http://192.168.6.17:3001/isUserAuth", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response)=>{
            console.log(response)
        })
    }

    const logout = ()=>{
        Axios.get("http://192.168.6.17:3001/logout", {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response)=>{
            if(response.data.loggedOut===true){
                setLogin(false)
            }
        })
    }

    return (
        <div className='LoginPage'>
            <h1 class="LoginPage__title">Login/Registration</h1>
            {loginStatus==false && (
            <div>
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
            </div>
            )}
            
            {loginStatus==true && (
                <div>
                    <button onClick={userAuthenticated}>Check authentification</button>
                    <button onClick={logout}>Logout</button>
                    <a href='/'>Play game</a>
                </div>
            )}
            
        </div>
    )
}

export default Login