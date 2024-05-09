import React from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      if (data.role === 'admin') {
        // Navigate to home page for admin
        navigate('/');
      } else {
        // Navigate to profile page for other users
        navigate('/profile');
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <section className='bgl'>
    <div className='logl'>
      <h1 className='logtextl'>Login</h1>
      <form  onSubmit={handleSubmit} className='formtxtl'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='inputtxtl'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='inputtxtl'
          onChange={handleChange}
        />
        <button disabled={loading} className='btnlogl'>
           
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <div className='txtsigl'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span >Sign up</span>
        </Link>
      </div>
      </form>
      <p className='text-red-700 mt-5'>{error && 'wrong account!'}</p>

    </div>
    </section>
  )
}

export default Login