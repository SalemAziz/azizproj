import React, { useEffect, useState } from 'react';
import "./creatematch.css"

function CreateMatch() {
  const [formData, setFormData] = useState({
    matchname: '',
    fieldId: '',
    description: '',
    dayofthweek: '',
    houroflocation: ''
  });
  const [fields, setFields] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch('/api/field/getfield');
        const data = await res.json();
        if (res.ok) {
          setFields(data.fields);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFields();
  }, []);

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
        window.location.reload();
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDayChange = async (e) => {
    const day = e.target.value;
    setFormData({ ...formData, dayofthweek: day });
    const fieldId = formData.fieldId;
    if (!day || !fieldId) {
      return;
    }

    try {
      const res = await fetch(`/api/match/availabletimeslots?day=${day}&fieldId=${fieldId}`);
      const data = await res.json();
      if (res.ok) {
        setTimeSlots(data.timeSlots);
      }
    } catch (error) {
      console.error('Error fetching available time slots:', error.message);
    }
  };

  const handleTimeSlotChange = (e) => {
    setFormData({ ...formData, houroflocation: e.target.value });
  };

  const getNext30Days = () => {
    const current = new Date();
    const next30Days = [];
    for (let i = 0; i < 30; i++) {
      const day = new Date();
      day.setDate(current.getDate() + i);
      next30Days.push(day.toDateString()); // Format the date as needed
    }
    return next30Days;
  };

  const daysOfWeek = getNext30Days();

  return (
    <div className='creatematchsection'>
      <form onSubmit={handleSubmit}>
        <div className='creatematchmain'>
          <div className='matchname'>
            <input type="text" id='matchname' className='matchnameinp' placeholder='Match name' onChange={(e) =>
              setFormData({ ...formData, matchname: e.target.value })
            } />
          </div>
          <div className='chosefield'>
            <select
              className='chosef'
              onChange={(e) =>
                setFormData({ ...formData, fieldId: e.target.value })
              }
            >
              <option value="">Select Field</option>
              {fields.map(field => (
                <option key={field._id} value={field._id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          <div className='reservationdate'>
            <select className='reservationdat' onChange={handleDayChange}>
              <option value="">Select Day</option>
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className='reservationdate'>
            <select className='reservationdatt' onChange={handleTimeSlotChange}>
              <option value="">Select Time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className='descrip'>
            <input type="text" id='description' className='descripp' placeholder='description' onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            } />
          </div>

          <button type='submit' className='matchcrt'><span>Reserve</span></button>
        </div>
      </form>
    </div>
  )
}

export default CreateMatch;
