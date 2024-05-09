import React from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));      
          return;
      }
      dispatch(signInSuccess(data));
      if (data.role === 'admin') {
        // Navigate to home page for admin
        navigate('/');
      } else {
        // Navigate to profile page for other users
        navigate('/profile');
      }
    } catch (error) {
      dispatch(signInFailure(error));
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
      <p className='mt'>
        {error ? error.message || 'Something went wrong!' : ''}</p>

    </div>
    </section>
  )
}

export default Login