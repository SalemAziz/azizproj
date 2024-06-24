import React from 'react'
import { useSelector } from 'react-redux';
import "./profinfo.css"
import { IoMail } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import  {  useEffect, useState  } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from '../comment/Comment'; 
import GetPost from '../posts/GetPost'
import { RiDeleteBinLine } from "react-icons/ri";






export default function ProfInfo() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [userMatchs, setUserMatchs] = useState([]);
    const [visibleCommentPostId, setVisibleCommentPostId] = useState(null);
  
    const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/post/deletepost/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUserPosts(prevPosts  => prevPosts .filter(post => post._id !== postId));
        setFilteredPosts(prevPosts => prevPosts .filter(post => post._id !== postId));
      } else {
        const data = await res.json();
        console.error('Failed to delete match:', data.message);
      }
    } catch (error) {
      console.error('Error deleting match:', error.message);
    }
  };

  const handleLike = async (postId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/post/likePost/${postId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setUserPosts(
          userPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCommentClick = (postId) => {
    setVisibleCommentPostId(visibleCommentPostId === postId ? null : postId);
  };

    
    useEffect(() => {
      const fetchMatchs = async () => {
        try {
          const res = await fetch(`/api/match/getmatch?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserMatchs(data.matchs);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser && currentUser._id) {
        fetchMatchs();
      }
    }, [currentUser]);

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
                <label className=' profnamme'>{currentUser.username}</label>  
        </div> 
        <Link to={"/profile"}><button title="filter" class="filter">
  <svg viewBox="0 0 512 512" height="1em">
    <path
      d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
    ></path>
  </svg>
  
</button>
</Link>

        <div className='mainaccount'>
        <div className='accounattrb'>
          <div className='detailsprof'><FaUserAlt /> {currentUser.role}</div>
          <div className='detailsprof'><IoMail /> {currentUser.email}</div>
          <div className='detailsprof'><FaPhone /> {currentUser.phone}</div>
          <div className='detailsprof'><FaBirthdayCake /> {currentUser.birthday}</div>
          <div className='detailsprof'><IoCreate /> {currentUser.createdAt}</div>


        </div>
        <div className='pub'>
        <div className='postContentt'>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="singlepostt">
              <div className='postcrtpicc'>
                <img src={post.creatorpic} alt='Creator' className='imgaa' />
              </div>
              <div className='postcreatorr'>
                {post.creatorpost}
              </div>
          
              <div className='contentdivv'>
              {currentUser && post.userId === currentUser._id && (
              <button onClick={() => handleDeletePost(post._id)} className="deleteButtons">
                <RiDeleteBinLine />

              </button>
            )}
                <div className="descc">
                  {post.content}
                </div>
                {post.image && (
                  <div className='postpicc'>
                    <img src={post.image} alt='Post' className='imgbb' />
                  </div>
                )}
              </div>
              <div className='postbtnsdiv flex'>
                <button  onClick={() => handleLike(post._id)} className='postbtns'><FaRegHeart  className='postico'/><h1 className='likesnumber'> {post.numberOfLikes}</h1></button>
                <button 
                  className='postbtns' 
                  onClick={() => handleCommentClick(post._id)} 
                >
                  <FaRegComment className='postico2'/>
                </button>

              </div>
              {visibleCommentPostId === post._id && (
                <div className="commentSection">
                  <Comment postId={post._id} /> 
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

        </div>
        <div className='matchaccount'>
      {userMatchs.length > 0 ? (
  <table className='tablematchaccount'>
    <thead className='tabthead'>
      <tr className='tabhhead'> 
        <th>Image</th>
        <th>Username</th>
       

      </tr>
    </thead>
    <tbody className='tbodyy'>
      {userMatchs.map((match) => (
        <tr key={match.id}>
          <td>
            <img src={match.picfield} alt={match.creator} className='imgaccc' />
          </td>
          <td><Link className="linkk" to={`/matchinfo/${match._id}`}>{match.creatorusername}</Link></td>
        

        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No matches found.</p>
)}
      </div>
        </div>
        </div>

    </section>
  )
}
