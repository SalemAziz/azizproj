import "./pagescss/demande.css"
import { GrGallery } from "react-icons/gr";
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import video from "./../../assets/202760-918944267_small.mp4"
import Navbar from '../../components/homecomp/Navbar/Navbar';
import Footer from "../../components/homecomp/Footer/Footer";

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


    <div className='demande'>
      <Navbar/>
       
        <form onSubmit={handleSubmit} className='demandeform'>
        <div className='vidm'>
        <video src={video}className='vidmm'/>
        </div>

          <div className='ownerattrb'>

            <div className=''>
              <input type="text" id='' className='orattrb' placeholder='Owner name ' onChange={(e) =>
              setFormData({ ...formData, ownerfullname: e.target.value })
            }/> 
            </div>
            <div className=''>
              <input type="text" id='' className='orattrb' placeholder='Email ' onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })}/>
            </div>
            <div>
              <input type="text" id='' className='orattrb' placeholder='Phone'onChange={(e) =>
              setFormData({ ...formData, numtel: e.target.value })} />
            </div>
          
          </div>
          <div className='fieldattrb'>
            <div className=''>
              <input type="text" id='' className='fiettrb' placeholder='Field name ' onChange={(e) =>
              setFormData({ ...formData, fieldname: e.target.value })} />
            </div>
            <div className=''>
              <input type="text" id='' className='fiettrb' placeholder='Adress' onChange={(e) =>
              setFormData({ ...formData, adress: e.target.value })} />
            </div>
            <div className=''>
              <input type="text" id='' className='fiettrb' placeholder='Code' onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })}/>
            </div>
            <div className=''>
              <input type="number" id="quantity"  placeholder="Price" className="fiettrb" min="50" max="60" onChange={(e) =>
              setFormData({ ...formData, playerallowd: e.target.value })} />
            </div>
            <div className='descrip'>
              <input type="text" id='' className='demandedesc' placeholder='Description ' onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }/> 
            </div>
            <div className=''>
              <input type="file" id='' className='' placeholder=' '  hidden ref={fileRef}  onChange={handleFileChange}/>
              <span className='tagimgg'onClick={() => fileRef.current.click()}><GrGallery /> </span>
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
      <Footer/>


    </>
  )
}
