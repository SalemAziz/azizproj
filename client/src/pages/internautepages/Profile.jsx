import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavUser from '../../components/usercomp/NavUser';
import { app } from '../../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../../redux/user/userSlice';
import "./pagescss/profile.css";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleConfirmDelete = () => {
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <NavUser />
      <section className='profsec'>
        <div className='proff'>
          <form onSubmit={handleSubmit} className='profform'>
            <input
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
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
              placeholder='Phone'
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
            <button type='button' onClick={handleConfirmDelete} className='proftx'>
              Delete Account
            </button>
          </form>
          <p className='uper'>{error && 'Something went wrong!'}</p>
          <p className='uper'>{updateSuccess && 'User is updated successfully!'}</p>
        </div>
      </section>

      {showConfirm && (
        <div className="card">
          <button className="exit-button" onClick={handleCancelDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </button>
          <div className="card-content">
            <h2 className="card-heading">Confirm Deletion</h2>
            <p className="card-description">Are you sure you want to delete this account?</p>
            <div className="card-button-wrapper">
              <button className="card-button primary" onClick={handleDeleteAccount}>Yes</button>
              <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
