import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css";

export default function DashUser() {
  const { currentUser } = useSelector((state) => state.user);
  const [userUsers, setUserUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      if (res.ok) {
        setUserUsers(data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserUsers((prev) => prev.filter((user) => user._id !== userToDelete));
        setShowConfirm(false);
        setUserToDelete(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirmDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  return (
    <div className='tabsec'>
      {userUsers.length > 0 ? (
        <table className='tabs'>
          <thead>
            <tr>
              <th className='tabattrb'>CreatedAt</th>
              <th className='tabattrb'>Creator</th>
              <th className='tabattrb'>Profile Picture</th>
              <th className='tabattrb'>Role</th>
              <th className='tabattrb'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userUsers.map((user) => (
              <tr key={user._id} className='ms'>
                <td className='mrp'>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className='mrp'>{user.username}</td>
                <td className='mrp'>
                  <img src={user.profilePicture} className='mrppic' alt="Profile" />
                </td>
                <td className='mrp'>{user.role}</td>
                <td className='mrp'>
                  <button
                    onClick={() => handleConfirmDelete(user._id)}
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
        <p>You have no users yet!</p>
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
            <p className="card-description">Are you sure you want to delete this user?</p>
            <div className="card-button-wrapper">
              <button className="card-button primary" onClick={handleDeleteUser}>Yes</button>
              <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
