import React from 'react'
import NavUser from '../components/usercomp/NavUser'
import { useSelector } from 'react-redux';
import "./pagescss/profile.css"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <NavUser/>
    <section className='profsec'>
      <div className='proff'>
      <h1 className='proftit'>Profile Settings :</h1>
      <form className='profform'>
        <img
          src={currentUser.profilePicture}
          alt='profile'
          className='profimg'
        />
        
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='profput'
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='profput'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='profput'
        />
        <button className='probtn'>update</button>
      </form>
      <div className="proft">
        <span className='proftx'>Delete Account</span>
        <span className='proftx'>Sign out</span>
      </div>
      </div>
    </section>
    </>
  )
}