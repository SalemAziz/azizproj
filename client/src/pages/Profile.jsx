import React from 'react'
import NavUser from '../components/usercomp/NavUser'
import { useSelector } from 'react-redux';
import "./pagescss/profile.css"
import { useRef, useState, useEffect } from 'react';
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
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

  return (
    <>
      <NavUser />
      <section className='profsec'>
        <div className='proff'>
          <h1 className='proftit'>Profile Settings :</h1>
          <form className='profform'>
            <input type="file" ref={fileRef} hidden accept='image/*'
              onChange={(e) => setImage(e.target.files[0])} />
            <img
              src={currentUser.profilePicture}
              alt='profile'
              className='profimg'
              onClick={() => fileRef.current.click()}
            />
            <p className='yh'>
              {imageError ? (
                <span className='mr'>Error uploading image (file size must be less than 2 MB)</span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className='mr'>{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className='mr'>Image uploaded successfully !</span>
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