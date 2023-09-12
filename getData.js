const axios = require('axios');

// Define the API endpoint
const apiUrl = 'http://dev.4idps.com.tw:5101/api/tests'; // Replace with the actual API URL

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const data = response.data;
      console.log('Fetched data:', data);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Call the function to fetch data
fetchData();