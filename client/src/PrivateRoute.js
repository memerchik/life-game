import React, {useEffect, useState} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import Axios from 'axios'

function PrivateRoutes() {
    // const [loggedIn, setLoggedIn] = useState(null)
    // useEffect(() => {
    //     Axios.get("http://localhost:3001/login").then((res)=>{
    //         if(res.data.loggedin == true){
    //             setLoggedIn(true)
    //         }
    //         else{
    //             setLoggedIn(false)
    //         }
    //     })
    // }, [])
    let auth = {
        token: "false"
    }

    return (
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes