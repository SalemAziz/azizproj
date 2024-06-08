import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function About() {
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcom');
        const data = await res.json();
        if (res.ok && data.comments) {
          setUserComments(data.comments);
        } else {
          setUserComments([]); // Ensure userComments is always an array
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setUserComments([]); // Ensure userComments is always an array
      }
    };

    fetchComments();
  }, []);

  console.log(userComments);

  return (
    <div>
      <h1>User Comments</h1>
      {userComments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {userComments.map(({ _id, comment }) => (
            <li key={_id}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
