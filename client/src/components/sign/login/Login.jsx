import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className='log'>
      <h1 className='logtext'>Sign Up</h1>
      <form className='formtxt'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='inputtxt'
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='inputtxt'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='inputtxt'
        />
        <button className='btnlog'>
          Sign up
        </button>
      </form>
      <div className='txtsig'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span >Sign in</span>
        </Link>
      </div>
    </section>
  )
}

export default Login