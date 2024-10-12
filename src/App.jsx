import { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import axios from 'axios';
import Form from './Form';

function App() {
  const [syncMessage, setSyncMessage] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');

  const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1rBSf6_vJgDWrB9_t6bJbrqbFAzdlDTN-L8RPfIJ_H7w/edit?usp=sharing';

  const handleSyncData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sync-data');
      setSyncMessage(response.data.message);
      setSheetUrl(googleSheetUrl);
    } catch (error) {
      console.error('Error syncing data:', error);
      setSyncMessage('Failed to sync data.');
      setSheetUrl('');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
          Select Form
        </h1>


        <div className="flex space-x-4 mb-8">
          <Link to="/form/a">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-sm md:text-base lg:text-lg">
              Form A
            </button>
          </Link>
          <Link to="/form/b">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded text-sm md:text-base lg:text-lg">
              Form B
            </button>
          </Link>
        </div>

        <div className="mt-8">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded text-sm md:text-base lg:text-lg"
            onClick={handleSyncData}
          >
            Sync Data to Google Sheets
          </button>
        </div>


        {syncMessage && <p className="mt-4 text-sm md:text-base lg:text-lg text-center">{syncMessage}</p>}


        {sheetUrl && (
          <div className="mt-4">
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded text-sm md:text-base lg:text-lg"
            >
              View Google Sheet
            </a>
          </div>
        )}
      </div>


      <Routes>
        <Route path="/form/:formType" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
