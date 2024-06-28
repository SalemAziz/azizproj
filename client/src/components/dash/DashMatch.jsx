import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./managepost.css";

export default function DashMatch() {
  const { currentUser } = useSelector((state) => state.user);
  const [userMatchs, setUserMatchs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);

  const fetchMatchs = async () => {
    try {
      const res = await fetch(`/api/match/getmatch`);
      const data = await res.json();
      if (res.ok) {
        setUserMatchs(data.matchs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMatchs();
  }, []);

  const handleDeleteMatch = async () => {
    try {
      const res = await fetch(`/api/match/deletematch/${matchToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserMatchs((prev) => prev.filter((match) => match._id !== matchToDelete));
        setShowConfirm(false);
        setMatchToDelete(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirmDelete = (matchId) => {
    setMatchToDelete(matchId);
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setMatchToDelete(null);
  };

  return (
    <div className='tabsec'>
      {userMatchs.length > 0 ? (
        <table className='tabs'>
          <thead>
            <tr>
              <th className='tabattrb'>CreatedAt</th>
              <th className='tabattrb'>Creator</th>
              <th className='tabattrb'>Post image</th>
              <th className='tabattrb'>Content</th>
              <th className='tabattrb'>Reservation Date</th>
              <th className='tabattrb'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userMatchs.map((match) => (
              <tr key={match._id} className='ms'>
                <td className='mrp'>{new Date(match.createdAt).toLocaleDateString()}</td>
                <td className='mrp'>{match.creatorusername}</td>
                <td className='mrp'>
                  <img src={match.picfield} className='mrppic' alt="Post" />
                </td>
                <td className='mrp'>{match.field}</td>
                <td className='mrp'>{match.reservationdate}</td>
                <td className='mrp'>
                  <button
                    onClick={() => handleConfirmDelete(match._id)}
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
            <p className="card-description">Are you sure you want to delete this match?</p>
            <div className="card-button-wrapper">
              <button className="card-button primary" onClick={handleDeleteMatch}>Yes</button>
              <button className="card-button secondary" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
