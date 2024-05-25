import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import "./dashcomp.css"

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalMatch, setTotalMatch] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthMatch, setLastMonthMatch] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchMatchs = async () => {
      try {
        const res = await fetch('/api/match/getmatch?limit=5');
        const data = await res.json();
        if (res.ok) {
          setMatchs(data.matchs);
          setTotalMatch(data.totalMatch);
          setLastMonthMatch(data.lastMonthMatch);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if  (currentUser.role === 'admin') {
      fetchUsers();
      fetchPosts();
      fetchMatchs();
    }
  }, [currentUser]);

  return (
    <div className='dashstatsection '>
      <div className='statsection flex'>
        <div className='total '>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Users</h3>
              <p className='totalnumber'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='usericon' />
          </div>
          <div className='lm'>
            <span className='lmicon'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='lmtit'>Last month</div>
          </div>
        </div>
        <div className='total'>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Matchs</h3>
              <p className='totalnumber'>{totalMatch}</p>
            </div>
            <HiAnnotation className='matchicon' />
          </div>
          <div className='lm'>
            <span className='lmicon'>
              <HiArrowNarrowUp />
              {lastMonthMatch}
            </span>
            <div className='lmtit'>Last month</div>
          </div>
        </div>
        <div className='total'>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Posts</h3>
              <p className='totalnumber'>{totalPosts}</p>
            </div>
            <HiDocumentText className='posticon' />
          </div>
          <div className='lm'>
            <span className='lmicon'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='lmtit'>Last month</div>
          </div>
        </div>
      </div>
      <div className='viewsection'>
        <div className='view'>
          <div className='viewattrb'>
            <h1 className='recent'>Recent users</h1>
            <button className='seeall'>
              <Link to={'/mainad?tab=User'}>See all</Link>
            </button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>User image</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='tableattrb'>
                  <td>
                    <img
                      src={user.profilePicture}
                      alt='user'
                      className='userprofileimg'
                    />
                  </td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='view'>
          <div className='viewattrb'>
            <h1 className='recent'>Recent matchs</h1>
            <button className='seeall'>
              <Link to={'/mainad?tab=Matchs'}>See all</Link>
            </button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>creator</th>
                <th>field</th>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>
              {matchs.map((match) => (
                <tr key={match._id} className='tableattrb'>
                   <td className='tdatrb'>
                    <img  src={match.creatorpic} className='imgpost'></img>
                  </td>
                  <td className='tdatrb'>
                    <p className='tdps'>{match.field}</p>
                  </td>
                  <td className='tdps'>{match.numberOfPlayers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='view'>
          <div className='viewattrb'>
            <h1 className='recent'>Recent posts</h1>
            <button className='seeall'>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Post image</th>
                <th>Post Content</th>
         
             
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className='tableattrb'>
                  <td>
                    <img
                      src={post. creatorpic}
                      alt='post'
                      className='imgpost'
                    />
                  </td>
                  <td className='tdatrb'>{post.content}</td>
         
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
