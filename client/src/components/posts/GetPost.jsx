import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./getpost.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function GetPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

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

  return (
    <section className='post container section'>
      <div className='postContent grid'>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="singlepost">

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
                <button className='postbtns'><FaRegComment className='postico2'/></button>
              </div>
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
