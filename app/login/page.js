'use client'

import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AuthServices from '@/services/AuthServices';
import { useRouter } from 'next/navigation';
import Message from '@/components/Message';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const changeValue = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthServices.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        router.push('/');
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-36">
      <img src="/mua.jpg" style={{ width: '300px', marginBottom: '20px' }} />
      <form
        onSubmit={onSubmit}
        className="flex flex-col text-center border w-2/6 p-3"
        style={{ background: 'rgb(102, 76, 0)', color: 'white' }}
      >
        <h3 className="text-4xl mt-8 mb-10">Go in</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={changeValue}
          className="mb-4 p-2 rounded"
          style={{ background: 'rgb(153, 115, 0)', color: 'white' }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={changeValue}
          className="mb-4 p-2 rounded"
          style={{ background: 'rgb(153, 115, 0)', color: 'white' }}
        />

        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Sign In</button>
        <label className="mt-2 text-white">
          Don't have an account? <Link href="/register" className="text-gray-300">Register</Link>
        </label>
      </form>
      {message && <Message message={message} />}
      <div className="mt-4">
        <p>
          <Link href="https://www.pirateproxy-bay.com/" className="text-white">Get the files (use VPN)</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
