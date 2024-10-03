import React, { useState } from "react";
import { Carousel } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import placeImage1 from './assets/place1.jpg'; 
import placeImage2 from './assets/place2.jpg';
import placeImage3 from './assets/place3.jpg';
import './Home.css';

const countryData = {
  USA: {
    states: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Illinois: ["Chicago", "Springfield", "Peoria"],
      NewYork: ["New York City", "Buffalo", "Rochester"]
    }
  },
  India: {
    states: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Karnataka: ["Bangalore", "Mysore", "Mangalore"],
      TamilNadu: ["Chennai", "Coimbatore", "Madurai"]
    }
  },
  Australia: {
    states: {
      NewSouthWales: ["Sydney", "Newcastle", "Wollongong"],
      Victoria: ["Melbourne", "Geelong", "Ballarat"],
      Queensland: ["Brisbane", "Gold Coast", "Cairns"]
    }
  },
  Brazil: {
    states: {
      RioDeJaneiro: ["Rio de Janeiro", "Niterói", "Angra dos Reis"],
      SaoPaulo: ["São Paulo", "Campinas", "Santos"],
      Bahia: ["Salvador", "Ilhéus", "Porto Seguro"]
    }
  },
  Canada: {
    states: {
      Ontario: ["Toronto", "Ottawa", "Niagara Falls"],
      BritishColumbia: ["Vancouver", "Victoria", "Whistler"],
      Quebec: ["Montreal", "Quebec City", "Gatineau"]
    }
  },
  Japan: {
    states: {
      Tokyo: ["Tokyo", "Shibuya", "Shinjuku"],
      Kyoto: ["Kyoto", "Fushimi", "Gion"],
      Hokkaido: ["Sapporo", "Otaru", "Hakodate"]
    }
  },
  Germany: {
    states: {
      Bavaria: ["Munich", "Nuremberg", "Regensburg"],
      Berlin: ["Berlin"],
      Hesse: ["Frankfurt", "Wiesbaden", "Kassel"]
    }
  },
  France: {
    states: {
      IleDeFrance: ["Paris", "Versailles"],
      Provence: ["Marseille", "Nice", "Cannes"],
      Normandy: ["Rouen", "Caen", "Le Havre"]
    }
  }
};

const suggestedPlaces = [
  { name: 'Los Angeles', image: placeImage1 },
  { name: 'San Francisco', image: placeImage2 },
  { name: 'Chicago', image: placeImage3 },
];

const CarouselComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(""); // Reset state when country changes
    setSelectedPlace(""); // Reset place when country changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedPlace(""); // Reset place when state changes
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  return (
    <div className="container">
      <h2><center>Travel Planner</center></h2>

      <Carousel>
        <Carousel.Item>
          <img src={image2} alt="Los Angeles" style={{ width: "100%" }} />
          <Carousel.Caption>
            <h3>Enjoy every beautiful place</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={image3} alt="Chicago" style={{ width: "100%" }} />
          <Carousel.Caption>
            <h3>Let’s enjoy the beauty of nature</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={image1} alt="New York" style={{ width: "100%" }} />
          <Carousel.Caption>
            <h3>Love and peace</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Dropdowns Section */}
      <div className="dropdown-section-container">
        <div className="dropdown-section">
          <label htmlFor="country">Select Country:</label>
          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">-- Select Country --</option>
            {Object.keys(countryData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-section">
          <label htmlFor="state">Select State:</label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">-- Select State --</option>
            {selectedCountry &&
              Object.keys(countryData[selectedCountry].states).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>

        <div className="dropdown-section">
          <label htmlFor="place">Select Tourist Place:</label>
          <select
            id="place"
            value={selectedPlace}
            onChange={handlePlaceChange}
            disabled={!selectedState}
          >
            <option value="">-- Select Place --</option>
            {selectedState &&
              countryData[selectedCountry].states[selectedState].map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Button Section */}
      <div className="button-container">
        <button>Search Your Favourite Place</button>
      </div>

      {/* Suggested Places Section */}
      <div className="best-place">
        <h3>Suggested Places</h3>
        <div className="suggested-places-container">
          {suggestedPlaces.map((place, index) => (
            <div className="place-container" key={index}>
              <img src={place.image} alt={place.name} className="place-image" />
              <h4>{place.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
