'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginPage = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login Successful', response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col p-2 m-2 justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold'>{loading ? 'Processing' : 'Login'}</h1>
      <hr />

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        value={user.email}
        placeholder='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className='rounded-lg border py-2 mb-2 border-gray-400 focus:outline-none focus:border-gray-800'
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={user.password}
        placeholder='password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className='rounded-lg border py-2 mb-2 border-gray-400 focus:outline-none focus:border-gray-800'
      />
      <button
        type='button'
        onClick={onLogin}
        className='rounded-lg border p-2 mb-2 border-gray-400 focus:outline-none focus:border-gray-800'
      >
        {buttonDisabled ? 'No Login' : 'Login Here'}
      </button>
      <Link href='/signup'> Visit Signup Page</Link>
    </div>
  );
};

export default LoginPage;
