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
            <span

              className='tagimg'
              onClick={() => fileRef.current.click()}>
              <GrGallery />

            </span>

          </div>
          <button type='submit' className='btnpost'>
            <a className='a'>Publish</a>
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
