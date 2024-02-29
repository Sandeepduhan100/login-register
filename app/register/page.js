'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css'; // Update this line to match your CSS file

function Register() {
  const router = useRouter(); // Initialize the router

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = async () => {
    try {
      // Client-side validation
      if (!user.name || !user.email || !user.password || !user.reEnterPassword) {
        setError('Please fill in all fields');
        return;
      }

      // Check if the passwords match
      if (user.password !== user.reEnterPassword) {
        setError('Passwords do not match. Please re-enter your password.');
        return;
      }

      setError(''); // Clear any previous error messages

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/reslog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message); // Show success message

        // Navigate to the home page after successful registration
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`); // Show error message
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div>
      <div className="register-container">
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} />
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} />
        <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange} />
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
        {error && <div className="error">{error}</div>}
        <div className="button" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="button"><a href="/login">Login</a></div>
      </div>
    </div>
  );
}

export default Register;
