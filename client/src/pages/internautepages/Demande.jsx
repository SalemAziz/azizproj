import NavUser from '../../components/usercomp/NavUser'
import "./pagescss/demande.css"
import { GrGallery } from "react-icons/gr";
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';





export default function Demande() {
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
      const res = await fetch('/api/demande/createdemande', {
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
  };

  return (
    <>
      <NavUser />
      <div className='demande'>
        <form onSubmit={handleSubmit} ><h1 className='titott'>Personal Contact:</h1>

          <div className='ownerattrb'>

            <div className=''>
              <label className="ttxt">name: </label>
              <input type="text" id='' className='orattrb' placeholder=' ' onChange={(e) =>
              setFormData({ ...formData, ownerfullname: e.target.value })
            }/> 
            </div>
            <div>
              <label className="ttxt">numtel: </label>
              <input type="text" id='' className='orattrb' placeholder=' 'onChange={(e) =>
              setFormData({ ...formData, numtel: e.target.value })} />
            </div>
            <div className=''>
              <label className="ttxt">email: </label>
              <input type="text" id='' className='orattrb' placeholder=' ' onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })}/>
            </div>
          </div>
          <h1 className='titott'>General information about your space:</h1>
          <div className='fieldattrb'>
            <div className=''>
              <label className="ttxt">field name: </label>
              <input type="text" id='' className='orattrb' placeholder=' ' onChange={(e) =>
              setFormData({ ...formData, fieldname: e.target.value })} />
            </div>
            <div className=''>
              <label className="ttxt">adress: </label>
              <input type="text" id='' className='orattrb' placeholder=' ' onChange={(e) =>
              setFormData({ ...formData, adress: e.target.value })} />
            </div>
            <div className=''>
              <label className="ttxt">code: </label>
              <input type="text" id='' className='orattrb' placeholder=' ' onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })}/>
            </div>
            <div className=''>
              <label className="ttxt">player allowed: </label>
              <input type="number" id="quantity" className="orattrb" min="50" max="60" onChange={(e) =>
              setFormData({ ...formData, playerallowd: e.target.value })} />
            </div>
            <div className=''>
              <input type="file" id='' className='orattrb' placeholder=' '  hidden ref={fileRef}  onChange={handleFileChange}
/>
              <label className="ttxt">pic field: </label>

              <span className='tagimgg'onClick={() => fileRef.current.click()}><GrGallery /> </span>

            </div>

            <div className='descrip'>
            <div className='ttxtt'> txt</div>


              <textarea className='demandedesc'value={formData.description || ''}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }} ></textarea>
            </div>


            <button type='submit' className='btdemande'>Resrve</button>
          </div>
          {imageUploadError && <div className='error'>{imageUploadError}</div>}
        {imageUploadProgress && (
          <div className='progress'>Uploading: {imageUploadProgress}%</div>
        )}
        {formData.image && (
          <img src={formData.image} alt='upload' className='selectedd' />
        )}


        </form>
      </div>


    </>
  )
}
