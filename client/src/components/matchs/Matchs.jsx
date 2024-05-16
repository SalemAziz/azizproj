import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClipboardCheck } from 'react-icons/lu';
import { GrValidate } from "react-icons/gr";

import "./match.css";
import img from "../../assets/img(1).jpg"




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
    <section className='mainmatch container section'>



      <div className='matchContent grid'>
        {userMatchs.length > 0 ? (
          userMatchs.map((match) => (
            <div key={match.id} className="singlematch">
              <div className="imageDiv">
                <img src={match.picfield} alt={match.creator} />
              </div>
              <div className="matchInfo">
                <h4 className="matchTitle">{match.creatorusername}</h4>
                <span className='matchcontinent flex'><FaLocationDot className='matchicon' />
                  <span className="matchname">{match.field}</span>
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
                  <p>{match.description}</p>

                </div>
                <button className='matchbtn flex'>
                  <a className='ta'>Details <LuClipboardCheck className='matchicon' /></a>
                </button>

              </div>

            </div>

          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </section>
  )
}

export default Matchs;
