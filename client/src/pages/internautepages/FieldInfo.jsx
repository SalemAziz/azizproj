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

 

  return (
    <>
      <NavUser />
      <div className='fieldinfo'>
        <div className='fielddetail'>
          {field ? (
            <div class="card">
  <label class="avatar"><img src={field.picfield} className='avatara'/></label>
  <label class="info">
    <span class="info-1">Name:{field.name}</span>
    <span class="info-2">                {field.location ? (
                  <div className='detail'>
                    Location: {field.location.state}, {field.location.city}, {field.location.town}
                  </div>
                ) : (
                  <div>Location information not available</div>
                )}
                <div>feed:{field.feesf}</div></span>
  </label>
  <div class="content-1">{field.description}</div>

</div>
          ) : (
            <p>Loading field information...</p>
          )}
          {publishError && <p className="error">{publishError}</p>}
        </div>


      </div>
    </>
  );
}
