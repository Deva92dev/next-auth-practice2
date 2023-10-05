'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SignupPage = () => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup Successful', response.data.message);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col p-2 m-2 justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold'>
        {loading ? 'Processing' : 'Signup'}
      </h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        value={user.username}
        placeholder='username'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className='rounded-lg border py-2 mb-2 border-gray-400 focus:outline-none focus:border-gray-800'
      />
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
        onClick={onSignup}
        className='rounded-lg border p-2 mb-2 border-gray-400 focus:outline-none focus:border-gray-800'
      >
        {buttonDisabled ? 'No Signup' : 'Signup Here'}
      </button>
      <Link href='/login'> Visit Login Page</Link>
    </div>
  );
};

export default SignupPage;
