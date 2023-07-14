'use client'

import Link from "next/link"
import { useState,useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import AuthServices from "@/services/AuthServices"

const Navbar = (props) => {

    const {isAuthenticated,user,setUser,setIsAuthenticated} = useContext(AuthContext)


    const UnauthenticatedNav = () => {
        return (
            <div className='flex justify-center gap-8'>
                <Link href='/'>home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </div>
        )
    }

    const OnClickLogout = () => {
        AuthServices.logout()
          .then(data => {
            if (data.success) {
              setUser(data.user);
              setIsAuthenticated(false);
            } else {
              // Handle logout failure
              console.log('Logout failed');
            }
          })
          .catch(error => {
            // Handle any errors that occur during the logout process
            console.error('Logout error:', error);
          });
      };

    const AuthenticatedNav = () => {
        return (
            <div className='flex justify-center gap-8'>
                <Link href='/'>home</Link>
                <Link href="/notes">Posts</Link>
                {user.role === 'admin' ? <Link href="/admin">Admin</Link> : null}
                {user.role === 'Superadmin' ? <Link href="/superadmin">Super Admin dashboard</Link> : null}
                {user.role === 'Superadmin' ? <Link href='/manage/users'>Manage users</Link> : null}
                {user.role === 'Superadmin' ? <Link href='/manage/admins'>Manage admins</Link> : null}
                <button onClick={OnClickLogout}>Logout</button>
            </div>
        )
    }


  return (
    <div>
       <Link href="/">Logo-ul proiectului</Link> 
       {isAuthenticated ? AuthenticatedNav() : UnauthenticatedNav()}
    </div>
  )
}

export default Navbar
