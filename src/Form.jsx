import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const { formType } = useParams();
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      navigate('/listing');
    }
  }, [navigate]);


  const validateForm = () => {
    const errors = {};
    if (!name.match(/^[A-Za-z ]+$/)) {
      errors.name = 'Name must contain only alphabetic characters';
    }
    if (!countryCode) {
      errors.countryCode = 'Country code is required';
    }
    if (!phoneNumber.match(/^[0-9]+$/)) {
      errors.phoneNumber = 'Phone number must be numeric';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:3000/submit-form', { formType, name, countryCode, phoneNumber });
        localStorage.setItem('formData', JSON.stringify({ name, countryCode, phoneNumber }));
        navigate('/listing');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Form {formType.toUpperCase()}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="countryCode">
            Country Code
          </label>
          <select
            className={`shadow appearance-none border ${errors.countryCode ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700`}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="">Select country code</option>
            <option value="+1">+1 (USA)</option>
            <option value="+91">+91 (India)</option>
          </select>
          {errors.countryCode && <p className="text-red-500 text-xs mt-2">{errors.countryCode}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className={`shadow appearance-none border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700`}
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-2">{errors.phoneNumber}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
