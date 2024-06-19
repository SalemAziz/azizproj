import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavUser from '../../components/usercomp/NavUser';
import "./fieldreserv.css";

export default function FieldReservations() {
  const [field, setField] = useState(null);
  const [matches, setMatches] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [loadingField, setLoadingField] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchField = async () => {
      try {
        const res = await fetch(`/api/field/getfield?ownerEmail=${currentUser.email}`);
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
      } finally {
        setLoadingField(false);
      }
    };

    fetchField();
  }, [currentUser.email]);

  useEffect(() => {
    if (field) {
      const fetchMatches = async () => {
        try {
          const res = await fetch(`/api/match/getmatch?fieldId=${field._id}`);
          const data = await res.json();
          if (res.ok) {
            setMatches(data.matchs);
          } else {
            console.error(data.message);
            setPublishError(data.message);
          }
        } catch (error) {
          console.log(error.message);
          setPublishError('Failed to fetch matches.');
        } finally {
          setLoadingMatches(false);
        }
      };

      fetchMatches();
    }
  }, [field]);

  return (
    <>
      <NavUser />
      <div className='fieldinfo'>
        <div className='fielddetaill'>
          {loadingField ? (
            <p>Loading field information...</p>
          ) : (
            field ? (
              <div class="card">
              <label class="avatar"><img src={field.picfield} className='avatara'/></label>
              <label class="info">
                <span class="info-1">Name:{field.name}</span>
                <span class="info-2">     
                            <div>Hi {field.ownerName} ! Below you can check your FieldReservations</div></span>
              </label>
             
            </div>
            ) : (
              <p>Field information not available</p>
            )
          )}
          {publishError && <p className="error">{publishError}</p>}
        </div>

        <div className="matchtable">
          {loadingMatches ? (
            <p>Loading matches...</p>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
