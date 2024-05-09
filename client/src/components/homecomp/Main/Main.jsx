import React from 'react'
import "./main.css"
import img from "../../../assets/img(1).jpg"
import { FaLocationDot } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { GrValidate } from "react-icons/gr";





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
const Main = () => {
  return (
    <section className='main container section'>
      <div className="secTitle">
        <h3 className="title">
          Most selected fields <GrValidate  className='icon' />


        </h3>
      </div>


      <div className='secContent grid'>
        {
          Data.map(({ id, imgSrc, destTitle, description, location,  fees }) => {
            return (
              <div key={id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>
                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className='continent flex'><FaLocationDot className='icon' />
                    <span className="name">{location}</span>
                  </span>
                  <div className="fees flex">
                  <div className="grade">
                    <span>Cost :</span>
                  </div>
                  <div className="price">
                    <h5>{fees}</h5>
                  </div>
                  </div>
                  <div className="desc">
                    <p>{description}</p>

                  </div>
                  <button className='btn flex'>
                    Details <LuClipboardCheck className='icon' />
                  </button>

                </div>

              </div>

            )
          })
        }

      </div>
    </section>
  )
}

export default Main