import React from 'react'
import Navbar from '../Navbar/Navbar'
import './About.css'
import img from '../travel_assets/about-img.webp';
import Footer from '../Footer/Footer';
const About = () => {
  return (
    <div className='About'>
            <Navbar/>
      <div className="about-container">
          <h2>About</h2>
          <p>Looking for the best travel planners in India to plan your dream vacation? Look no further! India is a land of<span> wonderful diversity</span> , with something for everyone. 
Every destination has its hidden gems and unexplored corners. With<span> Travey</span> India specials, embark on journeys curated uniquely for those who seek the offbeat and extraordinary. As the best tour planner in India, we take pride in unveiling lesser-known marvels, ensuring your travels are truly one-of-a-kind. When you choose package specials, you choose an experience handpicked by the finest travel planners India can offer.
</p>
</div>

<div className="about-travey">
  <div className="about-travey-img">
    <img src={img} alt="travel"/></div>
    <div className="about-travey-text">
        <h2>Why Travey?</h2>
        <p>If you're planning your next trip to India, choosing the experienced trip organisers in India can make all the difference. With so many group travel planner options available, it can be tough to know where to start. After hiring a<span> Holiday planner</span> India, you can be sure that your trip will be well-planned and memorable.

One of the top reasons for choosing Trip Planners India is their expertise. India trip planners have extensive knowledge of the country's culture, geography, and attractions, which can help you create an itinerary according to your schedule with the help of their travel partner. With travel itinerary planner websites in India, you can browse different packages and find the perfect one for you.



</p>
</div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default About