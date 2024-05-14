import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import './createpost.css';
import img from "./../../assets/pos.png"


export default function CreatePost() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

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

  return (
    <div className='createpostcard'>
      <form className='formpost'>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='posttext'
          required
        />
        <div className='picpost'>
          <input
            type='file'
            accept='image/*'
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
          <img
            src={img}
            className='tagimg'
            onClick={() => fileRef.current.click()}
          />
    
        </div>
        <button type='submit' className='btnpost'>
          Publish
        </button>
    
      </form>
      {imageUploadError && <div className='error'>{imageUploadError}</div>}
          {imageUploadProgress && (
            <div className='progress'>Uploading: {imageUploadProgress}%</div>
          )}
          {formData.image && (
            <img src={formData.image} alt='upload' className='selected' />
          )}
    </div>
  );
}
