import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Packages = () => {
  const { id } = useParams();  // Get the package ID from the URL
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

  return (
    <div className="Packages">
      <h2>{packageDetails.city}</h2>
      <img src={packageDetails.imageUrl[0]} alt={packageDetails.city} />
      <p>{packageDetails.description}</p>
    </div>
  );
};

export default Packages;
