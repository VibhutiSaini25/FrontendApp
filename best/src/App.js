import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
    setError(null); // Clear previous error on input change
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const baseUrl = 'http://localhost:3000'; // Replace with your backend server URL
      const url = `${baseUrl}/bfhl`; // Combine base URL with endpoint

      const response = await axios.post(url, { data: JSON.parse(inputData) });
      setResponseData(response.data);
      setSelectedFilters([]); // Reset filters on new submission
    } catch (error) {
      console.error(error);
      setError(error.message || 'Error processing data');
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilters(event.target.selectedOptions);
  };

  const getFilteredData = (data) => {
    if (!data || !selectedFilters.length) return data;

    const filtered = {};
    for (const key in data) {
      if (selectedFilters.some((option) => option.value === key)) {
        filtered[key] = data[key];
      }
    }
    return filtered;
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="inputData">Enter JSON data:</label>
        <input
          type="text"
          id="inputData"
          value={inputData}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>

      {responseData && (
        <div>
          <h2>Response:</h2>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highestLowercaseAlphabet">Highest Lowercase Alphabet</option>
          </select>
          <pre>{JSON.stringify(getFilteredData(responseData), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;