import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";
import { FaThumbsUp } from 'react-icons/fa';

import './comment.css'

export default function Comment({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      } else {
        const data = await res.json();
        console.error('Failed to delete comment:', data.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setComments([data, ...comments]);
      }
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        // Handle case when user is not logged in
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map(comment =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Error liking comment:', error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <section className='commentsec'>
      <form onSubmit={handleSubmit}>
        <div className='createcomment'>
          <img className="createimg" src={currentUser.profilePicture} alt="Profile" />
          <textarea
            type='text'
            value={comment}
            placeholder='Add a comment'
            onChange={(e) => setComment(e.target.value)}
            className='commenttype'
          />
        </div>
        <button className="commenticon" type="submit"><IoSend /></button>
      </form>

      {comments.length === 0 ? (
        <p className='commentit'>Be the first to comment!</p>
      ) : (
        <div className='commentt'>
          <div className='commenttt'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>({comments.length})</p>
            </div>
          </div>
          {comments.map((comment) => (
            <div key={comment._id} className='commentaire'>
              <div className='commentaireinfo'>
                <img className="commentaireinfoimg" src={comment.creatorpiccom} alt="Profile" />
                <div className='commentairecontent'>
                  <div className='commentaireinfoname'>{comment.creatorcomment}</div>
                  <div className='commentairecontentt'>{comment.comment}</div>
                </div>
              </div>
              <button onClick={() => handleLike(comment._id)} className="commentlikebtn" type='button'>
                Like {comment.numberOfLikes}
              </button>
              {currentUser && comment.userId === currentUser._id && (
                <button onClick={() => handleDeleteComment(comment._id)} className="commentlikebtn">
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
