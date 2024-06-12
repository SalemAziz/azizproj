import React, { useRef, useState } from 'react';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import './createpost.css';
import { PiTelegramLogo } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';






export default function CreatePost() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    uploadImage(selectedFile);
  };

  const uploadImage = async (selectedFile) => {
    try {
      if (!selectedFile) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + selectedFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        window.location.reload();;
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  }
  return (
    <section className='postsec'>
      <div className='createpostcard'>
        <div className='postpicname'>
          <Link className="propic" to='/profile'>
            {currentUser && (
              <img className='rm' src={currentUser.profilePicture} alt='profile' />
            )}
          </Link>
        </div>
        <form className='formpost' onSubmit={handleSubmit}>
          <textarea
            placeholder='whats going on?! '
            className='posttext'
            required
            value={formData.content || ''}
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
            }}
          />
          <div className='postpub'>
            <div className='picpost'>
              <input
                type='file'
                accept='image/*'
                hidden
                ref={fileRef}
                onChange={handleFileChange}
              />

              <button className='tagimg'
                onClick={() => fileRef.current.click()} title="filter" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
                  <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                ADD FILE
              </button>





            </div>
            <button type='submit' className='btnpost'>
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </div>

        </form>
        <div></div>
        {imageUploadError && <div className='error'>{imageUploadError}</div>}
        {imageUploadProgress && (
          <div className='progress'>Uploading: {imageUploadProgress}%</div>
        )}
        {formData.image && (
          <img src={formData.image} alt='upload' className='selected' />
        )}
      </div>

    </section>

  );
}
