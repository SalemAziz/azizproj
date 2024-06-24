import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import "./dashcreatf.css";
import { LuUploadCloud } from "react-icons/lu";

export default function DashCreatf() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({ location: {} });
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  console.log(formData);

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
            setFormData((prevData) => ({ ...prevData, image: downloadURL }));
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
      const res = await fetch('/api/field/createf', {
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

      setPublishError(null);
      window.location.reload();
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <section className='creatfsec'>
      <form onSubmit={handleSubmit} className='creatform'>
        <div className='nameinputt'>
          <input
            type="text"
            placeholder="Field Name"
            className='nameinputtname'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className='locationinput'>
          <input
            className='locationinputtt'
            type="text"
            placeholder="State"
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location, state: e.target.value }
            })}
          />
          <input
            type="text"
            className='locationinputtt'
            placeholder="City"
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location, city: e.target.value }
            })}
          />
          <input
            type="text"
            className='locationinputtt'
            placeholder="Town"
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location, town: e.target.value }
            })}
          />
        </div>
        <div className='ownerdetailinput'>
          <input
            type="text"
            className='ownerdetailinputtt'
            placeholder="Owner Name"
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          />
          <input
            type="text"
            className='ownerdetailinputtt'
            placeholder="Owner Email"
            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
          />
          <input
            type="text"
            className='ownerdetailinputtt'
            placeholder="Owner Phone"
            onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
          />
        </div>
        <div className='detailsinputt'>
          <input
            type="text"
            className='detailsinputtt'
            placeholder="Fees"
            onChange={(e) => setFormData({ ...formData, feesf: e.target.value })}
          />
          <input
            type="text"
            className='detailsinputtt'
            placeholder="Working Hours"
            onChange={(e) => setFormData({ ...formData, workhour: e.target.value })}
          />
        </div>
        <textarea
          type="text"
          className='descriptioninput'
          placeholder="Description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div>
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={handleFileChange}
          />
          <span className='pictureinputt' onClick={() => fileRef.current.click()}><LuUploadCloud />
          </span>
        </div>
        <button type="submit" className='btdemande'>Add Field</button>
        {imageUploadError && <div className='error'>{imageUploadError}</div>}
        {imageUploadProgress && <div className='progress'>Uploading: {imageUploadProgress}%</div>}
        {formData.image && <img src={formData.image} alt='upload' className='selectedddimg' />}
        {publishError && <div className='error'>{publishError}</div>}
      </form>
    </section>
  );
}
