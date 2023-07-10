'use client'

import { useState } from 'react'
import AuthServices from '@/services/AuthServices'
import {useRouter} from 'next/navigation'
import Message from '@/components/Message'


const LoginPage = (props) => {
  const router = useRouter()

  const [user,setUser] = useState({
    username: '',
    password: '',
    role: '',
  })
  const [message,setMessage] = useState(null)

 

  const changeValue = (e) => {
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})
  }

  const resetForm = () => {
    setUser({username:'',password:'',role:''})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    AuthServices.register(user).then(data => {
      const {user,message } = data
        router.push('/login')
        console.log(user)      
        setMessage(message)
        resetForm()
    })
  }


  return (
    <div className='flex justify-center mt-36'>
      <form onSubmit={onSubmit} className='flex flex-col text-center border w-3/6 p-3'>
        <h3 className='text-4xl mt-8 mb-10'>Please sign up</h3>
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

        <label htmlFor="role">Role </label>
        <input type="text"
              name="role"
              placeholder="Enter role"
              value={changeValue.role}
              onChange={e => setUser({...user,role:e.target.value})} />

        <button className='bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>sign up</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default LoginPage
