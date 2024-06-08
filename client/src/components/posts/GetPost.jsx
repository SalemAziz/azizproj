import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./getpost.css";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from '../comment/Comment'; 

function GetPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [visibleCommentPostId, setVisibleCommentPostId] = useState(null);
  console.log(userPosts)

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
                <button className='postbtns'><FaRegHeart className='postico'/></button>
                <button 
                  className='postbtns' 
                  onClick={() => handleCommentClick(post._id)} // Fix the post ID here
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
