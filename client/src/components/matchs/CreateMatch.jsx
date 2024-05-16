import React from 'react'
import "./creatematch.css"
import { useState } from 'react';



function CreateMatch() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/match/creatematch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        window.location.reload();;
        
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='creatematchsection'>
      <form onSubmit={handleSubmit}>
      <div className='creatematchmain'>
        <div className='matchname'>
        <label className="txxt">name: </label>

          <input type="text" id='matchname' className='matchnameinp' placeholder=' Match name'    onChange={(e) =>
              setFormData({ ...formData, matchname: e.target.value })
            }/>
        </div>
        <div className='reservationdate'>
          <label className="txxt" >date: </label>
          <input className='reservationdat' type="datetime-local"  id='reservationdate' onChange={(e) =>
              setFormData({ ...formData, reservationdate: e.target.value })
            }/>
        </div>
        <div className='chosefield'>
          <label className="txxt">Field: </label>
          <select className='chosef '  onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            } >
            <option className="fields">pick a field</option>
            <option className="fields">Volvo</option>
            <option className="fields">Saab</option>
            <option className="fields">Opel</option>
            <option className="fields">Audi</option>
          </select>
        </div>
        <button type='submit' className='matchcrt'>Resrve</button>

        <div className='descrip'>
          <textarea className='descripp'   value={formData.description || ''}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}></textarea>
        </div>
      </div>
      </form>
    </div>
  )
}

export default CreateMatch