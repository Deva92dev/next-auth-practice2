'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProfilePage = () => {
  const [data, setData] = React.useState('nothing');
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log(response.data);
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/certainUser');
    console.log(response.data);
    // data is coming from certainUser Route
    setData(response.data.data._id);
  };

  return (
    <div className='flex flex-col p-2 m-2 justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold'>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <h2 className='m-2 bg-pink-400 rounded-lg p-2 text-2xl font-bold'>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-2'
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded'
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
