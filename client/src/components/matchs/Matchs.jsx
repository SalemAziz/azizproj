import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClipboardCheck } from 'react-icons/lu';
import "./match.css";

const Matchs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userMatchs, setUserMatchs] = useState([]);
  console.log(userMatchs);

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

  return (
    <section className='match container section'>
      <div className='matchContent grid'>
        {userMatchs.length > 0 ? (
          userMatchs.map((match) => (
            <div key={match._id} className="singleMatch">
              <div className="imageMatch">
                <img src={match.picfield} alt={match.creator} />
              </div>
              <div className="matchInfo">
                <h4 className="matchTitle">{match.creatorusername}</h4>
                <span className='continentMatch flex'>
                  <FaLocationDot className='matchIcon' />
                  <span className="match">{match.field}</span>
                </span>
                <div className="matchFees flex">
                  <div className="matchGrade">
                    <span>Cost:</span>
                  </div>
                  <div className="matchPrice">
                    <h5>{match.fees}</h5>
                  </div>
                </div>
                <div className="matchDesc">
                  <p>{match.description}</p>
                </div>
                <button className='btn flex'>
                  Details <LuClipboardCheck className='icon' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No matches available.</p>
        )}
      </div>
    </section>
  );
}

export default Matchs;
