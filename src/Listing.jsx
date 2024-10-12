import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Listing = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));

    if (!savedData && !location.state?.fromFormSubmit) {
      navigate('/');
    } else {
      setFormData(savedData);
    }
  }, [location, navigate]);


  const handleDeleteData = () => {
    localStorage.removeItem('formData');
    navigate('/');
  };

  if (!formData) {
    return <p>No saved data found.</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Saved Data</h1>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Country Code:</strong> {formData.countryCode}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>


      <div className="mt-8 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>


        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteData}
        >
          Delete Data
        </button>
      </div>
    </div>
  );
};

export default Listing;
