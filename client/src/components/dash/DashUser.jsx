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
                            <span
                             onClick={() => handleDeleteUser(user._id)}
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
