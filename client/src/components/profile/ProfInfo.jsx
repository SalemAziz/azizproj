import React from 'react'
import { useSelector } from 'react-redux';
import "./profinfo.css"
import { IoMail } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import  {  useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";





export default function ProfInfo() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchPosts();
    }, []);

  return (
    <section className='accountinfo'>
      <div className='accountinfffo'>
    
        <div className='topinfo'>
                <img  className="profileeimg"src={currentUser.profilePicture} />
                <div className=' profnamme'>{currentUser.username}</div>          
        </div> 
        <div className='accounattrb'>
          <div className='detailsprof'><FaUserAlt /> {currentUser.role}</div>
          <div className='detailsprof'><IoMail /> {currentUser.email}</div>
          <div className='detailsprof'><FaPhone /> {currentUser.phone}</div>
          <div className='detailsprof'><FaBirthdayCake /> {currentUser.birthday}</div>
          <div className='detailsprof'><IoCreate /> {currentUser.createdAt}</div>


          <button className='updtbtn'><Link className='updd' to="/profile"> Update Info</Link></button>
        </div>
        <div className='pub'>
        <div className='postContentt '>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="singlepostt">

              <div className='postcrtpicc'>
                <img src={post.creatorpic} alt='Creator' className='imgaa' />
              </div>

              <div className='postcreatorr'>
                {post.creatorpost}
              </div>
              <div className='contentdivv'>
                <div className="descc">
                  {post.content}
                </div>
                {post.image && (
                  <div className='postpicc'>
                    <img src={post.image} alt='Post' className='imgbb' />
                  </div>
                )}
              </div>

            </div>

          ))
        ) : (
          <p>No posts available.</p>
        )}

      </div>

        </div>
        
        </div>

    </section>
  )
}
