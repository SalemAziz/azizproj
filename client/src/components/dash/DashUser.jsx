import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "./managepost.css"

export default function DashUser() {
 const { currentUser } = useSelector((state) => state.user);
  const [userUsers, setUserUsers] = useState([]);
 

  const handleDeleteUser = async (userId) => {
      try {
          const res = await fetch(`/api/user/delete/${userId}`, {
              method: 'DELETE',
          });
          const data = await res.json();
          if (!res.ok) {
              console.log(data.message);
          } else {
              setUserUsers((prev) => prev.filter((user) => user._id !== userId));
          }
      } catch (error) {
          console.log(error.message);
      }
  };

  useEffect(() => {
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

    fetchUsers();
}, []);
  return (
    <div className='tabsec'>
    {userUsers.length > 0 ? (
        <table className='tabs'>
            <thead>
                <tr>
                    <th className='tabattrb'>createdAt</th>
                    <th className='tabattrb'> creator</th>
                    <th className='tabattrb'>Post image</th>
                    <th className='tabattrb'> Content</th>
                    

                    <th className='tabattrb'>Delete</th>

                </tr>
            </thead>
            <tbody>
                {userUsers.map((user) => (
                    <tr key={user._id} className='ms'>
                        <td className='mrp'>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        <td className='mrp'>
                            {user.username}
                        </td>
                        <td className='mrp'>

                            <img
                                src={user.profilePicture}
                                className='mrppic'
                            />

                        </td>
                        <td className='mrp'>

                            {user.role}

                        </td>

                        <td className='mrp'>
                            <button
                             onClick={() => handleDeleteUser(user._id)}
                                className='deltemrp'
                            >
                               <span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                            </button>
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
