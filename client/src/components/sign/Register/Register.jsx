import React from 'react'
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OAth from '../oath/OAth';


const Register = () => {
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <section className='bg'>
    <div className='log'>
      <h1 className='logtext'>Sign Up</h1>
      <form  onSubmit={handleSubmit} className='formtxt'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='inputtxt'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='inputtxt'
          onChange={handleChange}
        />
        <input
          type='date'
          id='birthday'
          className='inputtxt'
          onChange={handleChange}
        />

        <input
          type='tel'
          id='phone'
          placeholder='phone'

          className='inputtxt'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='inputtxt'
          onChange={handleChange}
        />
        <button disabled={loading} className='btnlog'>
           
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAth/>
        <div className='txtsig'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span >Sign In</span>
        </Link>
      </div>
      </form>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>

    </div>
    </section>
  )
}

export default Register