import React from 'react'
import "./welcome.css"
import video from "../../../assets/video.mp4"


const Welcome = () => {
  return (
    <section className='welcome'>
      <div className="overlay"> </div>
      <video className="video" src={video} muted autoPlay loop type='video/mp4'></video>

      <div className="welcomeContent container">
        <div className="textDiv">

          <h1 className='smallText'>
            welcome
            </h1>

          <h1 className="welcomeTitle">
          Score your perfect spot with just a click 
              <h1>  where every yard counts!</h1>
          </h1>

        </div>
      </div>

    </section>
  )
}

export default Welcome