import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "./managepost.css"


export default function DashMatch() {

const { currentUser } = useSelector((state) => state.user);
const [userMatchs, setUserMatchs] = useState([]);

const handleDeleteMatch = async (matchId) => {
  try {
      const res = await fetch(`/api/match/deletematch/${matchId}`, {
          method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
          console.log(data.message);
      } else {
          setUserMatchs((prev) => prev.filter((match) => match._id !== matchId));
      }
  } catch (error) {
      console.log(error.message);
  }
};

  useEffect(() => {
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

    fetchMatchs();
}, []);
  return (
    <div className='tabsec'>
    {userMatchs.length > 0 ? (
        <table className='tabs'>
            <thead>
                <tr>
                    <th className='tabattrb'>createdAt</th>
                    <th className='tabattrb'> creator</th>
                    <th className='tabattrb'>Post image</th>
                    <th className='tabattrb'> Content</th>
                    <th className='tabattrb'> Content</th>
                    

                    <th className='tabattrb'>Delete</th>

                </tr>
            </thead>
            <tbody>
                {userMatchs.map((match) => (
                    <tr key={match._id} className='ms'>
                        <td className='mrp'>
                            {new Date(match.createdAt).toLocaleDateString()}
                        </td>

                        <td className='mrp'>
                            {match.creatorusername}
                        </td>
                        <td className='mrp'>

                            <img
                                src={match.picfield}
                                className='mrppic'
                            />

                        </td>
                        <td className='mrp'>

                            {match.field}

                        </td>
                        <td className='mrp'>

                            {match.reservationdate}

                        </td>

                        <td className='mrp'>
                            <span
                             onClick={() => handleDeleteMatch(match._id)}
                                className='deltemrp'
                            >
                                Delete
                            </span>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>You have no posts yet!</p>
    )}
</div>
  )
}
