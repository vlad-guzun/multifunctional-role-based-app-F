'use client'

import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

export default function Home() {

  const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
  
  console.log(user)
  console.log(isAuthenticated)


  return (
     <div>
     </div>
  )
}
