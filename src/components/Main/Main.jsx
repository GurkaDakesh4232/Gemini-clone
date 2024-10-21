import React from 'react';
import './Main.css'
import { assets } from '../../assets/assets';





const Main = () => {
    
  return (
    <div className='main'>
    <div className='nav'>
        <p>Gemini </p>
        <img src={assets.user_icon} alt='' />
    </div>
      <div className='main-container'>
        <div className='greet'>
            <p><span>Hello,Bro</span></p>
            <p>How Can I help You Today...</p>
        </div>

        <div className='cards'>
            <div className='card'>
                <p>suggest a beautiful thign i n the world</p>
                <img src={assets.compass_icon} alt='' />
            </div>

            <div className='card'>
                <p>Briefly summarize this concept urban planing</p>
                <img src={assets.bulb_icon} alt='' />
            </div>

            <div className='card'>
                <p>Branstrome team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt='' />
            </div>

            <div className='card'>
                <p>improve the readibility of the following code</p>
                <img src={assets.code_icon} alt='' />
            </div>
        </div>

        <div className='main-bottom'>
            <div className='search-box'>
                <input  value="text"  type='text' placeholder='Enter prompt Here...' readOnly />
                    <div>
                       <img src={assets.gallery_icon} alt=""/>
                       <img src={assets.mic_icon} alt=""/>
                        <img src={assets.send_icon} alt=""/>
                    </div>
                   
                
                
                
            </div>
            <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, 
                    so double-check its responses. Your privacy and Gemini Apps

                    </p>
           </div>
          
      </div>
      
    </div>
  );
};

export default Main;