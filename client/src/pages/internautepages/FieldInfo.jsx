import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavUser from '../../components/usercomp/NavUser';
import "./pagescss/fieldinfo.css";

export default function FieldInfo() {
  const [field, setField] = useState(null);
  const [matches, setMatches] = useState([]);
  const [publishError, setPublishError] = useState(null);

  const { fieldId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

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
        setField(data.fields[0]);
      } catch (error) {
        console.error(error.message);
        setPublishError('Failed to fetch field information.');
      }
    };

    fetchField();
  }, [fieldId]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`/api/match/getmatch?fieldId=${fieldId}`);
        const data = await res.json();
        if (res.ok) {
          setMatches(data.matchs);
        }
      } catch (error) {
        console.log(error.message);
        setPublishError('Failed to fetch matches.');
      }
    };

    fetchMatches();
  }, [fieldId]);

  return (
    <>
      <NavUser />
      <div className='fieldinfo'>
        <div className='fielddetail'>
          {field ? (
            <div className='fieldiii'>
              <div className='fielddetailss'>
                <div className='detailname'> {field.name}</div>
                {field.location ? (
                  <div className='detail'>
                    Location: {field.location.state}, {field.location.city}, {field.location.town}
                  </div>
                ) : (
                  <div>Location information not available</div>
                )}
                <div className='detail'>WorkHour: {field.workhour}</div>
                <div className='detail'>Price: {field.feesf}</div>
              </div>
              <div className='imgg'>
                <img src={field.picfield} className='imggg' alt='Field' />
              </div>
            </div>
          ) : (
            <p>Loading field information...</p>
          )}
          {publishError && <p className="error">{publishError}</p>}
        </div>

        <div className="matchtable">
          <table className='matchtableinfo'>
            <thead>
              <tr>
                <th>Creator</th>
                <th>Day</th>
                <th>Schedule</th>
                <th>N° of Players</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
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
      </div>
    </>
  );
}
