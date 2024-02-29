'use client'
import React, { useState } from 'react';
import './login.css';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async () => {

    try {
      // Client-side validation
      if (!user.email || !user.password) {
        setError('Please fill in both email and password');
        return;
      }

      setError(''); // Clear any previous error messages

      // Check if the email exists in the MongoDB database
      const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/checkemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      if (!checkResponse.ok) {
        // Handle non-successful HTTP status
        alert('Error checking email existence');
        return;
      }

      const checkData = await checkResponse.json();

      if (!checkData.success) {
        setError('Email does not exist');
        return;
      }

      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <input
        type='text'
        name='email'
        value={user.email}
        placeholder='Enter your Email'
        onChange={handleChange}
        required
      />
      <input
        type='password'
        name='password'
        value={user.password}
        placeholder='Enter your Password'
        onChange={handleChange}
      />
      {error && <div className='error'>{error}</div>}
      <div className='button' onClick={handleLogin}>
        Login
      </div>
      <div>or</div>
      <div className='button'>
        <a href='/register'>Register</a>
      </div>
    </div>
  );
}

export default Login;
