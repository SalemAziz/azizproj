import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./getpost.css";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from '../comment/Comment'; 
import { RiDeleteBinLine } from "react-icons/ri";

function GetPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [visibleCommentPostId, setVisibleCommentPostId] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  console.log(userPosts)

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


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
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
  

  const handleCommentClick = (postId) => {
    setVisibleCommentPostId(visibleCommentPostId === postId ? null : postId);
  };
  

  return (
    <section className='post container section'>  
      <div className='postContent grid'>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="singlepost">
              <div className='postcrtpic'>
                <img src={post.creatorpic} alt='Creator' className='imga' />
              </div>
              <div className='postcreator'>
                {post.creatorpost}
              </div>
          
              <div className='contentdiv'>
              {currentUser && post.userId === currentUser._id && (
              <button onClick={() => handleDeletePost(post._id)} className="deleteButtons">
                <RiDeleteBinLine />

              </button>
            )}
                <div className="desc">
                  {post.content}
                </div>
                {post.image && (
                  <div className='postpic'>
                    <img src={post.image} alt='Post' className='imgb' />
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
    </section>
  );
}

export default GetPost;
