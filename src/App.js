import './App.css'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const[city,setCity]=useState('');
  const[cityDetail,setCityDetail]=useState('');
  const[weather,setWeather]=useState('');
  const [error, setError] = useState(null);

  const apiKey = '4bfd8873ccf84f6eb6995602241902';

  const fetchWeatherData = async () => { 
    try{
      if (!city) {
        throw new Error('Enter a city');
      }
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();  
      if (!data || !data.current) {
        throw new Error('Place not found');
      }
      setWeather(data.current);  
      setCityDetail(data.location);
      setError(null);
    }
    catch(error){
      setWeather(null); 
      toast.error(error.message);
    }
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    fetchWeatherData();
  };

  const handleChange =(e) =>{
    setCity(e.target.value);
  }

  return ( 
    <div className="App">
       <div className="background-main"> 
       </div>
       <form onSubmit={handleSubmit}>
       <input className='citySearch' placeholder='Enter a city...'value={city} onChange={handleChange}/> 
       <button className='btnSubmit'>Submit</button> 
       </form>
       <div className='main-area'>
        <div className='weather-section'>
          {weather &&(
            <div className='city-details'>
              <div className='weather-img'> 
              </div>
              <div className='weather-text'> 
                  <h3>Today</h3>
                  <h1>{cityDetail.name}</h1>
                  <h4>Temperature: {weather.temp_c}°C / {weather.temp_f}°F</h4>
                  <h4>{weather.condition.text}</h4>
            </div> 
            </div>
          ) 
          }
        </div>
       </div>
       <ToastContainer />
    </div>
  );
}

export default App;
