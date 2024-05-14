import React from 'react'
import "./createpost.css"
import { GrGallery } from "react-icons/gr";
import { useRef} from 'react';






export default function CreatePost() {
  const fileRef = useRef(null)

  return (
    <div className='createpostcard flex'>
      <form className='formpost flex '>
        <ul>
          <li>
          <input type='file'  ref={fileRef} hidden  />
            <textarea
              placeholder='Write something...'
              className='posttext'
            />
          </li>
          <li>
          <span onClick={() => fileRef.current.click()} > <GrGallery  className='picpost'  /></span>

            <button type='submit' className='btnpost'>
              Publish
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
