import React from 'react'
import { useState } from 'react';
import "./dashcreatf.css"

export default function DashAddUser() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/user/create', {
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
    <section className='creatfsec'>
      
 
      <form  onSubmit={handleSubmit} className='creatform'>
      <div className='nameinputt'>        <input
          type='text'
          placeholder='Username'
          id='username'
          className='nameinputtname'
          onChange={handleChange}
        />
        </div>
        <div className='locationinput'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='locationinputtt'
          onChange={handleChange}
        />
           <input
          type='tel'
          id='phone'
          placeholder='phone'

          className='locationinputtt'
          onChange={handleChange}
        />

        <input
          type='date'
          id='birthday'
          className='locationinputtt'
          onChange={handleChange}
        />
        </div>
        <div className='ownerdetailinput'>
        <select id="role" className='ownerdetailinputtt' onChange={handleChange}>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="fieldowner">Field Owner</option>
</select>
     
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='ownerdetailinputtt'
          onChange={handleChange}
        />
          </div>
        <button disabled={loading} className='btdemande'>
           
          Add User
        </button>
  
        <div className='txtsig'>
    
      </div>
      </form>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>


    </section> 
     )
}
