'use client'

import { AuthContext } from "@/context/AuthContext";
import { useContext, useState, useEffect } from 'react';

const ManageAdmins = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      const res = await fetch('http://localhost:5000/manage/admins', { credentials: 'include' });
      const data = await res.json();
      setAdmins(data);
    };

    getAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    const res = await fetch(`http://localhost:5000/manage/admins/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
    setAdmins(admins.filter((admin) => admin._id !== id));
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

  console.log(admins);

  return (
    <div className='flex flex-col justify-center mt-10'>
      <h1 className='text-3xl font-bold mb-4'>Manage Admins</h1>
      <ul className='space-y-4'>
        {admins.map((admin) => (
          <li key={admin._id} className='border rounded-lg py-4 px-6 flex items-center justify-between'>
            <span className='text-lg'>{admin.username}</span>
            <button onClick={() => deleteAdmin(admin._id)} className='px-4 py-2 rounded bg-red-500 text-white'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAdmins;
