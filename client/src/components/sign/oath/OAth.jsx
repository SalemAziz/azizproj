import React from 'react'
import './oath.css'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          phone: result.user.phone,
          birthday: result.user.birthday,


          
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/postpage');
    } 
   
    catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <button type="button" onClick={handleGoogleClick} className='btnoath'><FcGoogle className='m'/> Google
    </button>
  )
}
