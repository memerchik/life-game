import React from 'react'
import { Outlet } from 'react-router-dom'

const useAuth = () => {
    const user = {logged: false}
    return user.logged
}

function ProtectedRoutes() {
    const isAuth = useAuth()
    alert("a")
    return isAuth ? <Outlet/> : <div>NOT LOGGED IN</div>
}

export default ProtectedRoutes