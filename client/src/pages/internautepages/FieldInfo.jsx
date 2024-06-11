import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavUser from '../../components/usercomp/NavUser';
import "./pagescss/fieldinfo.css"
export default function FieldInfo() {
  const [fields, setFields] = useState([]);
  const [matchs, setMatchs] = useState([]);

  
  const { fieldId } = useParams();
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  console.log(matchs)


  useEffect(() => {
    const fetchField = async () => {
      try {
        const res = await fetch(`/api/field/getfield?fieldId=${fieldId}`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message);
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        setFields(data.fields[0]);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchField();
  }, [fieldId]);
  
  useEffect(() => {
    const fetchMatchs = async () => {
      try {
        const res = await fetch(`/api/match/getmatch?fieldId=${fieldId}`);
        const data = await res.json();
        if (res.ok) {
          setMatchs(data.matchs);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
      fetchMatchs();
    
  }, [fieldId]);

  return (
    <>
      <NavUser />
      <div className='fieldinfo'>

        <div className="matchtable">
          <table className='matchtableinfo'>
            <thead>
              <tr>
                <th>Creator</th>
                <th>day</th>
                <th>Schedule</th>
                <th>N°players</th>
              </tr>
            </thead>
            <tbody>
              {matchs.map((match, index) => (
                <tr key={index}>
                  <td>{match.creatorusername}</td>
                  <td>{match.dayofthweek}</td>
                  <td>{match.houroflocation}</td>
                  <td>{match.numberOfPlayers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='fielddetail'>
          {fields ? (
            <>
              <div className='detail'>Field : {fields.name}</div>

              {fields.location ? (
                <div className='detail'>Location : {fields.location.state}, {fields.location.city}, {fields.location.town}</div>
              ) : (
                <div>Location information not available</div>
              )}
              <div className='detail'>WorkHour : {fields.workhour}</div>

              <div className='detail'>Price : {fields.feesf}</div>


            </>
          ) : (
            <p>Loading field information...</p>
          )}
          {publishError && <p className="error">{publishError}</p>}
        </div>
      </div>
    </>
  )
}
