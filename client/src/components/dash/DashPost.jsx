import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/post/deletepost/${postToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postToDelete));
        setShowConfirm(false);
        setPostToDelete(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirmDelete = (postId) => {
    setPostToDelete(postId);
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setPostToDelete(null);
  };

  return (
    <div className='tabsec'>
      {userPosts.length > 0 ? (
        <table className='tabs'>
          <thead>
            <tr>
              <th className='tabattrb'>CreatedAt</th>
              <th className='tabattrb'>Creator</th>
              <th className='tabattrb'>Post image</th>
              <th className='tabattrb'>Content</th>
              <th className='tabattrb'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id} className='ms'>
                <td className='mrp'>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className='mrp'>{post.creatorpost}</td>
                <td className='mrp'>
                  <img src={post.image} className='mrppic' alt="Post" />
                </td>
                <td className='mrp'>{post.content}</td>
                <td className='mrp'>
                  <button
                    onClick={() => handleConfirmDelete(post._id)}
                    className='deltemrp'
                  >
                    <span className="text">Delete</span>
                    <span className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no posts yet!</p>
      )}

      {showConfirm && (
        <div className="card">
          <button className="exit-button" onClick={handleCancelDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </button>
          <div className="card-content">
            <h2 className="card-heading">Confirm Deletion</h2>
            <p className="card-description">Are you sure you want to delete this post?</p>
            <div className="card-button-wrapper">
              <button className="card-button primary" onClick={handleDeletePost}>Yes</button>
              <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
