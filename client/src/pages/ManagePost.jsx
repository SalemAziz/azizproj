import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManagePost() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    console.log(userPosts);

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
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {userPosts.length > 0 ? (
                <table className='min-w-full bg-white shadow-md'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b'>Date updated</th>
                            <th className='py-2 px-4 border-b'>Post image</th>
                            <th className='py-2 px-4 border-b'>Post title</th>
                            <th className='py-2 px-4 border-b'>Category</th>
                            <th className='py-2 px-4 border-b'>Delete</th>
                            <th className='py-2 px-4 border-b'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPosts.map((post) => (
                            <tr key={post._id} className='border-b'>
                                <td className='py-2 px-4'>
                                    {new Date(post.updatedAt).toLocaleDateString()}
                                </td>
                                <td className='py-2 px-4'>
                                    <Link to={`/post/${post.slug}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-20 h-10 object-cover bg-gray-500'
                                        />
                                    </Link>
                                </td>
                                <td className='py-2 px-4'>
                                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </td>
                                <td className='py-2 px-4'>{post.category}</td>
                                <td className='py-2 px-4'>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                                        Delete
                                    </span>
                                </td>
                                <td className='py-2 px-4'>
                                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have no posts yet!</p>
            )}
        </div>
    );
}

export default ManagePost;
