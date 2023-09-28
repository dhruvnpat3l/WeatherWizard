import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  
  
// Function to handle the search button click
  const apiKey = 'c69c16d84589e23896552bf6179e8c8c';

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: searchInput,
            appid: apiKey,
             // Use 'imperial' for Fahrenheit
          },
        }
      );

      setWeatherData(response.data);
      console.log(response.data.weather[0].description)
      setWeatherDescription(response.data.weather[0].description);
      setLoading(false);
    } catch (err) {
      setError('City not found');
      setLoading(false);
    }
  };

  // useEffect to fetch weather data based on user's geolocation when the component mounts
    useEffect(() => {
      const getWeatherInfo = () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
              );

              const weatherData = await weatherResponse.json();
              setWeatherData(weatherData);
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
          });
        } else {
          console.error('Geolocation is not supported in this browser.');
        }
    };

    // Call the function to get weather data when the component mounts
      getWeatherInfo();
    }, []); 

    const toggleTemperatureUnit = () => {
      setIsCelsius(!isCelsius);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

  return (
    <div className=" p-2 w-screen h-screen bg-[#15ab99]">
    <div className=' p-2 h-full border-4 border-black'>
      <div className='top-0 right-0 h-full '>
            <header 
              className="App-header text-white ">
                  <div
                    className='w-48  border-2 p-2  sm:font-bold font-PantonRust text-3xl  text-black    bg-[#f15412] border-black'
                  >
                       <p>Weather Wizard</p> 
                      </div>
            
                      {/* input box  */}
                        <div
                          className='mt-2 '
                        >
                            <input
                            className='outline-none capitalize font-semibold p-2 text-black border-2 border-black'
                            type="text"
                            placeholder="Enter city or zip code"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                          />
                          <button 
                            className='border-2 ml-4 p-2 text-black font-bold border-black'
                          onClick={handleSearch}>Search</button>
                        </div>
            
                       {/* Toggle button for temperature units */}
                       
                      <div className='text-black'>
                        {/* toggle button  */}
                        <div 
                          className="toggle-container text-black"
                        >
                          <label for="TemperatureToggle" className="h-8 w-21 rounded-sm border-2 border-black mt-2 inline-flex items-center p-1  bg-white">
                            <input
                              id="TemperatureToggle"
                              type="checkbox"
                              className="hidden peer"
                              onChange={toggleTemperatureUnit}
                              checked={isCelsius}
                            />
                            <span className="h-6 px-4 rounded-sm  bg-white text-white peer-checked:bg-black">
                              {isCelsius ? '°C' : null}
                            </span>
                            <span className="h-6 px-4 rounded-sm bg-black text-white peer-checked:bg-white">
                              {isCelsius ? null : '°F'}
                            </span>
                          </label> 
                        </div>
            
                          {loading ? (
                            <p>Loading weather data...</p>
                          ) : error ? (
                            <p className='text-xl pl-2'>{error}</p>
                          ) : weatherData ? (
                            <div className='sm:font-semibold text-xl p-2 '>
                            
                              <p>Weather Information for 
                                  <p className='sm:font-bold text-5xl font-PantonRust'>
                                    {weatherData.name}, {weatherData.sys.country}
                                  </p> 
                              </p>
                          
                              <p>
                                  Temperature: {isCelsius
                                    ? (weatherData.main.temp / 10).toFixed(2) + '°C'
                                    : ((weatherData.main.temp / 10) * 1.8 + 32).toFixed(2) + '°F'}
                              </p>
                              {/* Rest of the weather information */}
                              <p>Humidity: {weatherData.main.humidity}%</p>
                              <p>Wind Speed: {weatherData.wind.speed}</p>
                              <p>Weather: {weatherData.weather[0].description}</p>
                            </div>
                          ) : null}
                  </div>
            </header>
        </div>

      </div>
      {/* location */}
      

    </div>
  );
}

export default App;