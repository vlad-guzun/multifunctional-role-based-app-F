'use client'

import { useState,useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import AuthServices from '@/services/AuthServices'
import {useRouter} from 'next/navigation'
import Message from '@/components/Message'
import Link from 'next/link'

const LoginPage = (props) => {
  const router = useRouter()

  const [user,setUser] = useState({
    username: '',
    password: '',
  })
  const [message,setMessage] = useState(null)
  const authContext = useContext(AuthContext)

 

  const changeValue = (e) => {
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    AuthServices.login(user).then(data => {
      const { isAuthenticated,user,message } = data
      if(isAuthenticated) {
        authContext.setUser(user)
        authContext.setIsAuthenticated(isAuthenticated)
        router.push('/')
      }
      else
        setMessage(message)
    })
  }


  return (
    <div className='flex justify-center mt-36'>
      <form onSubmit={onSubmit} className='flex flex-col text-center border w-3/6 p-3'>
        <h3 className='text-4xl mt-8 mb-10'>Please sign in</h3>
        <label htmlFor="username">Username </label>
        <input type="text" 
              name="username"
              placeholder="Enter username"
              value={changeValue.username}
              onChange={e => setUser({...user,username:e.target.value})} />

        <label htmlFor="password">Password </label>
        <input type="password"
              name="password"
              placeholder="Enter password"
              value={changeValue.password}
              onChange={e => setUser({...user,password:e.target.value})} />

        <button className='bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>sign in</button>
      <label className='mt-2'>Don't have an account? <Link href='/register' className='text-green-400'>Register</Link></label>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default LoginPage
