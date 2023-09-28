// weather.js

// Function to get user's IP address
async function getIpAddress() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
  }
}

// Function to get weather data based on IP address
async function getWeatherData(ipAddress) {
  try {
    // Get approximate location based on IP
    const locationResponse = await fetch(`https://ipinfo.io/${ipAddress}/json`);
    const locationData = await locationResponse.json();

    // Extract latitude and longitude
    const [lat, lon] = locationData.loc.split(',');

    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = 'c69c16d84589e23896552bf6179e8c8c';

    // Fetch weather data using latitude and longitude
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const weatherData = await weatherResponse.json();
    return weatherData;
  } catch (error) {
    console.error('Error getting weather data:', error);
    return null;
  }
}

// Export functions for use in other files
export { getIpAddress, getWeatherData };
