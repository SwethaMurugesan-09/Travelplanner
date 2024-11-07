import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Pakages.css';

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

  // Function to add lines around "Entry price" sections
  const formatDescription = (description) => {
    return description.replace(/(Entry price *: *\d+)/gi, '<hr />$1<hr />');
  };

  return (
    <div className="Packages">
      <h2>{packageDetails.city}</h2>
      <div className="Packages-images">
        <img src={packageDetails.imageUrl[1]} alt={`${packageDetails.city} view 1`} />
        <img src={packageDetails.imageUrl[2]} alt={`${packageDetails.city} view 2`} />
      </div>
      {/* Use dangerouslySetInnerHTML to render the formatted description */}
      <p dangerouslySetInnerHTML={{ __html: formatDescription(packageDetails.description) }} />
    </div>
  );
};

export default Packages;
