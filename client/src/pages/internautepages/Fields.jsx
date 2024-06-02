import React from 'react'
import "./pagescss/fields.css"
import img from "../../assets/img(1).jpg"
import { FaLocationDot } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";
import Navbar from '../../components/homecomp/Navbar/Navbar';
import NavUser from '../../components/usercomp/NavUser';


const Data = [
    {
      id: 1,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    },
    {
      id: 2,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    },
    {
      id: 3,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    }, 
    {
      id: 4,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    },
    {
      id: 5,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
  
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    },
    {
      id: 6,
      imgSrc: img,
      destTitle: "Bora Bora",
      location: "New Zealand",
      fees: "50 TND",
      description: "The epitome of romance, Bora Bora is one of the best travel destinations in the world. This place is known for its luxurious stays and adventurous activities."
    },
  
  ]

export default function Fields() {
  return (
    <>
    <NavUser/>
    <section className='mainf container section'>
    <div className="secTitlef">
      <h3 className="titlef">
        Most selected fields <GrValidate  className='icon' />


      </h3>
    </div>


    <div className='secContentf grid'>
      {
        Data.map(({ id, imgSrc, destTitle, description, location,  fees }) => {
          return (
            <div key={id} className="singleDestinationf">
              <div className="imageDivf">
                <img src={imgSrc} alt={destTitle} />
              </div>
              <div className="cardInfof">
                <h4 className="destTitlef">{destTitle}</h4>
                <span className='continentf flex'><FaLocationDot className='iconf' />
                  <span className="namef">{location}</span>
                </span>
                <div className="feesf flex">
                <div className="gradef">
                  <span>Cost :</span>
                </div>
                <div className="pricef">
                  <h5>{fees}</h5>
                </div>
                </div>
                <div className="descf">
                  <p>{description}</p>

                </div>
                <button className='btn flex'>
                  Details <LuClipboardCheck className='iconf' />
                </button>

              </div>

            </div>

          )
        })
      }

    </div>
  </section>
  </>
  )
}
