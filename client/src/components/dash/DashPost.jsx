import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./managepost.css"


export default function DashPost() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);
    const handleDeletePost = async (postId) => {
        try {
            const res = await fetch(`/api/post/deletepost/${postId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
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

        fetchPosts();
    }, []);
  return (
    <div className='tabsec'>
    
        
    {userPosts.length > 0 ? (
       
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
                {userPosts.map((post) => (
                    
                    <tr key={post._id} className='ms'>
                        <td className='mrp'>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </td>

                        <td className='mrp'>
                            {post.creatorpost}
                        </td>
                        <td className='mrp'>

                            <img
                                src={post.image}
                                className='mrppic'
                            />

                        </td>
                        <td className='mrp'>

                            {post.content}

                        </td>

                        <td className='mrp'>
                            <button
                             onClick={() => handleDeletePost(post._id)}
                                className='deltemrp'
                            ><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
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
