import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClipboardCheck } from 'react-icons/lu';
import { GrValidate } from "react-icons/gr";
import { Link } from 'react-router-dom';
import "./match.css";
import { IoSearch } from "react-icons/io5";


const Matchs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userMatchs, setUserMatchs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatchs, setFilteredMatchs] = useState([]);

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
    if (currentUser && currentUser._id) {
      fetchMatchs();
    }
  }, [currentUser]);

  useEffect(() => {
    setFilteredMatchs(
      userMatchs.filter(match =>
        match.creatorusername.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, userMatchs]);

  return (
    <section className='mainmatch container section'>
      <input 
        type="text" 
        placeholder="Search by creator username" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="searchBar"
      /><IoSearch className='icosearch' />


      {filteredMatchs.length > 0 ? (
        filteredMatchs.map((match) => (
          <Link to={`/matchinfo/${match._id}`} key={match._id}>
            <div className='matchContent grid'>
              <div className="singlematch">
                <div className="imageDiv">
                  <img className='imgg' src={match.creatorpic} alt={match.creator} />
                </div>
                <div className="matchInfo">
                  <h4 className="matchTitle">{match.creatorusername}</h4>
                  <span className='matchcontinent flex'><FaLocationDot className='matchicon' />
                    <span className="matchname">{match.fieldname}</span>
                  </span>
                  <div className="matchfees flex">
                    <div className="matchgrade">
                      <span>Cost :</span>
                    </div>
                    <div className="matchprice">
                      <h5>{match.fees}</h5>
                    </div>
                  </div>
                  <div className="matchdesc">
                    <p>{match.dayofthweek}-{match.houroflocation}</p>
                  </div>
                  <div className="matchdesc">
                    <p>"{match.description}"</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </section>
  );
}

export default Matchs;
