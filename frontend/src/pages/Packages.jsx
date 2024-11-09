import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Pakages.css';
import Navbar from '../components/Navbar/Navbar';

const Packages = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    async function fetchPackageDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/package/get/${id}`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error.response?.data || error.message);
      }
    }

    fetchPackageDetails();
  }, [id]);

  if (!packageDetails) {
    return <p>Loading package details...</p>;
  }

  const formatDescription = (description) => {
    return description.replace(/(Entry price *: *\d+)/gi, '<hr />$1<hr />');
  };

  return (
    <div className="packages-total-container">
      <Navbar/>
      <div className="Packages-container">
        <h3 className="package-container-h3">{packageDetails.city}</h3>
        
        <div className="packages-images">
          {packageDetails.imageUrl.map((image, index) => (
            <img className='packages-img'key={index} src={image} alt={`${packageDetails.city} - ${index + 1}`} />
          ))}
        </div>

        <p dangerouslySetInnerHTML={{ __html: formatDescription(packageDetails.description) }} />
      </div> 
    </div>
  );
};

export default Packages;
