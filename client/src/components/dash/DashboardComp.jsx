import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import StatChart from './StatChart';
import "./dashcomp.css";
import { GiSoccerField } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";


export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [fields, setFields] = useState([]);
  const [demands, setDemande] = useState([]);
  const [comments, setComments] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalMatch, setTotalMatch] = useState(0);
  const [totalFields, setTotalFields] = useState(0);
  const [totalDemandes, setTotalDemandes] = useState(0);
const [totalComments, setTotalComments] = useState(0);
const [lastMonthComments, setLastMonthComments] = useState(0);


  const [lastMonthFields, setLastMonthFields] = useState(0);
  const [lastMonthDemands, setLastMonthDemandes] = useState(0);
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
    const fetchFields = async () => {
      try {
        const res = await fetch('/api/field/getfield?limit=5');
        const data = await res.json();
        if (res.ok) {
          setFields(data.fields);
          setTotalFields(data.totalFields);
          setLastMonthFields(data.lastMonthFields);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchRequest = async () => {
      try {
        const res = await fetch('/api/demande/getdemande?limit=5');
        const data = await res.json();
        if (res.ok) {
          setDemande(data.demands);
          setTotalDemandes(data.totalDemandes);
          setLastMonthDemandes(data.lastMonthDemands);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.role === 'admin') {
      fetchUsers();
      fetchPosts();
      fetchMatchs();
      fetchFields();
      fetchRequest();
    }
  }, [currentUser]);

  const userLabels = ['Total Users', 'Last Month Users'];
  const userData = [totalUsers, lastMonthUsers];
  const postLabels = ['Total Posts', 'Last Month Posts'];
  const postData = [totalPosts, lastMonthPosts];
  const matchLabels = ['Total Matches', 'Last Month Matches'];
  const matchData = [totalMatch, lastMonthMatch];
  const fieldLabels = ['Total Fields', 'Last Month Fields'];
  const fieldData = [totalFields, lastMonthFields];
  const demandeLabels = ['Total Requests ', 'Last Month Requests'];
  const demandeData = [totalDemandes, lastMonthDemands];

  return (
    <div className='dashstatsection'>
      <div className='statsection flex'>
        <div className='total'>
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
          <StatChart title="Users" data={userData} labels={userLabels} />
        </div>
        <div className='total'>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Matches</h3>
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
          <StatChart title="Matches" data={matchData} labels={matchLabels} />
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
          <StatChart title="Posts" data={postData} labels={postLabels} />
        </div>

        <div className='total'>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Fields</h3>
              <p className='totalnumber'>{totalFields}</p>
            </div>
            <GiSoccerField className='fieldicon' />
          </div>
          <div className='lm'>
            <span className='lmicon'>
              <HiArrowNarrowUp />
              {lastMonthFields}
            </span>
            <div className='lmtit'>Last month</div>
          </div>
          <StatChart title="Fields" data={fieldData} labels={fieldLabels} />
        </div>

        <div className='total'>
          <div className='totala'>
            <div className=''>
              <h3 className='totaltit'>Total Request</h3>
              <p className='totalnumber'>{totalDemandes}</p>
            </div>
            <FaWpforms className='demandeicon' />
          </div>
          <div className='lm'>
            <span className='lmicon'>
              <HiArrowNarrowUp />
              {lastMonthDemands}
            </span>
            <div className='lmtit'>Last month</div>
          </div>
          <StatChart title="Requests" data={demandeData} labels={demandeLabels} />
        </div>
      </div>
      
     
    </div>
  );
}
