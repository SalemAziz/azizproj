import React, { useEffect, useState } from 'react';
import "./main.css";
import { FaLocationDot } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Main() {
  const [fields, setFields] = useState([]);
  const [totalFields, setTotalFields] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchTown, setSearchTown] = useState('');
  
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch('/api/field/getfield');
        const data = await res.json();
        if (res.ok) {
          setFields(data.fields);
          setTotalFields(data.totalFields);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFields();
  }, []);

  const filteredFields = fields.filter(field => 
    (searchName === '' || field.name.toLowerCase().includes(searchName.toLowerCase())) &&
    (searchState === '' || field.location.state.toLowerCase().includes(searchState.toLowerCase())) &&
    (searchTown === '' || field.location.town.toLowerCase().includes(searchTown.toLowerCase()))
  );

  return (
    <>
      <section className='mainfa container section'>
        <div className="secTitlefa">
          <h3 className="titlefa">
            Our Partners ( {totalFields} ) <GrValidate className='iconf' />
          </h3>
          <div className="searchContainera">
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              className="searchInput"
            />
             <IoSearch className='icosearchh' />
            <select 
              value={searchState} 
              onChange={(e) => setSearchState(e.target.value)} 
              className="searchInput"
            >
              <option value="">Select State</option>
              {Array.from(new Set(fields.map(field => field.location.state))).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select 
              value={searchTown} 
              onChange={(e) => setSearchTown(e.target.value)} 
              className="searchInput"
            >
              <option value="">Select Town</option>
              {Array.from(new Set(fields.map(field => field.location.town))).map(town => (
                <option key={town} value={town}>{town}</option>
              ))}
            </select>
           
          </div>
        </div>

        <div className='secContentfa grid'>
          {filteredFields.map((field) => (
            
            <div key={field._id} className="singleDestinationf">
              <div className="imageDivf">
                <img src={field.picfield} alt={field.name} />
              </div>
              <div className="cardInfofa">
                <h4 className="destTitlefa">{field.name}</h4>
                <span className='continentfa flex'>
                  <span className="namef">
                    <FaLocationDot className='iconf' />
                    {field.location.state},{field.location.town},{field.location.city}
                  </span>
                </span>
                <div className="feesf flex">
                  <div className="gradef">
                    <span>Cost :</span>
                  </div>
                  <div className="pricef">
                    <h5>{field.feesf}</h5>
                  </div>
                </div>
                <div className="descf">
                  <p>{field.description}</p>
                </div>
              
              </div>
            </div>
           
          ))}
        </div>
      </section>
    </>
  );
}
