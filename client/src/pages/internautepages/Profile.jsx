import React from 'react'
import NavUser from '../../components/usercomp/NavUser'
import { useSelector } from 'react-redux';
import "./pagescss/profile.css"
import { useRef, useState, useEffect } from 'react';
import { app } from '../../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess,  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure} from '../../redux/user/userSlice';


export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    let timer;
    if (updateSuccess) {
      timer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [updateSuccess]);
  
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };


  return (
    <>
      <NavUser />
      <section className='profsec'>
        <div className='proff'>
          <form onSubmit={handleSubmit} className='profform'>
            <input type="file" ref={fileRef} hidden accept='image/*'
              onChange={(e) => setImage(e.target.files[0])} />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt='profile'
              className='profimg'
              onClick={() => fileRef.current.click()}
            />
            <p className='yh'>
              {imageError ? (
                <span className='mr'>Error uploading image (file size must be less than 2 MB)</span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className='mr'>{`Uploading: ${imagePercent} %`}</span>
              ) : (
                ''
              )}
            </p>

            <input
              defaultValue={currentUser.username}
              type='text'
              id='username'
              placeholder='Username'
              className='profput'
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type='email'
              id='email'
              placeholder='Email'
              className='profput'
              onChange={handleChange}
            />
               <input
              defaultValue={currentUser.phone}
              type='tel'
          id='phone'
          placeholder='phone'

          className='profput'
          onChange={handleChange}
             
            />
             <input
              defaultValue={currentUser.birthday}
              type='date'
              id='birthday'
              className='profput'
              onChange={handleChange}
            />
            
            <input
              type='password'
              id='password'
              placeholder='Password'
              className='profput'
              onChange={handleChange}
            />
            <button className='probtn'>
              {loading ? 'Loading...' : 'Update'}
            </button>
            <button onClick={handleDeleteAccount} className='proftx'>Delete Account</button>
          </form>
        
          <p className='uper'>{error && 'Something went wrong!'}</p>
          <p className='uper'> {updateSuccess && 'User is updated successfully!'}
          </p>
        </div>
      </section>
    </>
  )
}