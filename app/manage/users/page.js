'use client'

import { AuthContext } from "@/context/AuthContext";
import { useContext, useState, useEffect } from 'react';

const ManageAdmins = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('http://localhost:5000/manage/users', { credentials: 'include' });
      const data = await res.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  const fetchUpdatedUsers = async () => {
    const res = await fetch('http://localhost:5000/manage/users', { credentials: 'include' });
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:5000/manage/user/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    console.log(data);
  };

  const promote = async (id) => {
    const res = await fetch(`http://localhost:5000/manage/promote/${id}`, {
      method: 'PATCH',
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    fetchUpdatedUsers(); // Fetch the updated users after promoting
  };

  if (!isAuthenticated) {
    return <h1 className='text-red-800'>Not authenticated!</h1>;
  }

  if (user.role !== 'Superadmin') {
    return (
      <div className='text-4xl text-red-800 text-center mt-9'>
        Unauthorized! Not allowed to access this page.
      </div>
    );
  }

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Manage Users</h1>
      <ul className='space-y-4'>
        {users.map((user) => (
          <li key={user._id} className='border rounded-lg py-4 px-6 flex items-center justify-between'>
            <span className='text-lg'>{user.username}</span>
            <div>
              <button onClick={() => deleteUser(user._id)} className='px-4 py-2 rounded bg-red-500 text-white'>Delete</button>
              <button onClick={() => promote(user._id)} className='ml-2 px-4 py-2 rounded bg-blue-500 text-white'>Promote</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAdmins;
