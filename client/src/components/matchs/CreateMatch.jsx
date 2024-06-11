import React, { useEffect, useState } from 'react';
import "./creatematch.css"

function CreateMatch() {
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [publishError, setPublishError] = useState(null);

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

  const filteredFields = fields.filter(field =>
    (searchName === '' || field.name.toLowerCase().includes(searchName.toLowerCase()))
  );

  const getCurrentWeekDays = () => {
    const current = new Date();
    const weekDays = [];
    const firstDayOfWeek = current.getDate() - current.getDay() + 1; // Get Monday (or the first day of the week)
    for (let i = 0; i < 7; i++) {
      const day = new Date(current.setDate(firstDayOfWeek + i));
      weekDays.push(day.toDateString()); // You can format this date as needed
    }
    return weekDays;
  };
  const getTimeSlots = () => {
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(7, 0, 0, 0); // Start at 7:00 AM
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // End at 12:00 PM

    while (currentTime <= endTime) {
      const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + 90); // Increment by 1.5 hours
    }
    return timeSlots;
  };
  const timeSlots = getTimeSlots();


  const daysOfWeek = getCurrentWeekDays();

  return (
    <div className='creatematchsection'>
      <form onSubmit={handleSubmit}>
        <div className='creatematchmain'>
          <div className='matchname'>
            <input type="text" id='matchname' className='matchnameinp' placeholder='Match name' onChange={(e) =>
              setFormData({ ...formData, matchname: e.target.value })
            } />
          </div>
      
          <div className='reservationdate'>
            <select className='reservationdat' onChange={(e) =>
              setFormData({ ...formData, dayofthweek: e.target.value })
            }>
              <option value="">Select Day</option>
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
            <select className='reservationdatt' onChange={(e) =>
              setFormData({ ...formData, houroflocation: e.target.value })
            }>
              <option value="">Select Time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className='chosefield'>
            <select className='chosef' onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }>
              <option value="">Select Field</option>
              {Array.from(new Set(fields.map(field => field.name))).map(town => (
                <option key={town} value={town}>{town}</option>
              ))}
            </select>
          </div>

          <button type='submit' className='matchcrt'>Reserve</button>
          <div className='descrip'>
            <textarea className='descripp' value={formData.description || ''}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}></textarea>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateMatch;
