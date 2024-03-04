import './App.css'
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cloudydayImage from './backgrounds/cloudy-day.png';
import thunderdayImage from './backgrounds/thunderstorm.png';
import rainyDayImage from './backgrounds/heavy-rain.png'
import clearSkyDayImage from './backgrounds/clear-sky.png'
import defaultDayimage from './backgrounds/default.png'
function App() {

  const[city,setCity]=useState('');
  const[cityDetail,setCityDetail]=useState('');
  const[weather,setWeather]=useState('');
  const [error, setError] = useState(null);

  const apiKey = 'e1cfcc6e96204e42b9286af91ff54c1a';

  const fetchWeatherData = async () => { 
    try{
      if (!city) {
        throw new Error('Enter a city');
      } 
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`);
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();  
      if (!data || !data.data) {
        throw new Error('Place not found');
      }
      setWeather(data);   
      setCityDetail(data.city_name);
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

  function getDayName(dayIndex){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  function getDayIndex(){
    return new Date().getDay(); 
  }

  const weatherConditionImg =(index) =>{
    var imgPath=""
    const weatherCondition=weather.data[index].weather.description;
    if(weatherCondition.includes('cloud')){
      imgPath=cloudydayImage;
    }
    else if (weatherCondition.includes('Thunderstorm')){
      imgPath=thunderdayImage;
    }
    else if (weatherCondition.includes('Rain')){
      imgPath=rainyDayImage;
    }
    else if (weatherCondition.includes('Sky')){
      imgPath=clearSkyDayImage;
    }
    else{
      imgPath=defaultDayimage;
    }
    return <img className='weather-img-mini' src={imgPath} alt={weatherCondition} />;
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
                  <h1>{cityDetail}</h1>
                  <h4>Temperature: {weather.data[0].min_temp} ~ {weather.data[0].max_temp}°C</h4>
                  <h4>{weather.data[0].weather.description}</h4>
              </div> 
            </div> 
          ) 
          }
          
        </div>
        {weather &&(
        <div className='miniGrids'>
        <div className='secndDay'>  
                  <div className='weather-img-mini'>
                  {weatherConditionImg(1)}
                  </div>
                  <h3>{getDayName((getDayIndex()+1)%7)}</h3>
                  <h4>Temperature: {weather.data[1].min_temp} ~ {weather.data[1].max_temp}°C</h4>
                  <h4>{weather.data[1].weather.description}</h4>
        </div>
        <div className='thirdDay'>
                  <div className='weather-img-mini'>
                  {weatherConditionImg(2)}
                  </div>
                  <h3>{getDayName((getDayIndex()+2)%7)}</h3>
                  <h4>Temperature: {weather.data[2].min_temp} ~ {weather.data[2].max_temp}°C</h4>
                  <h4>{weather.data[2].weather.description}</h4>
        </div>
        <div className='fourthDay'>
                  <div className='weather-img-mini'>
                  {weatherConditionImg(3)}
                  </div>
                  <h3>{getDayName((getDayIndex()+3)%7)}</h3>
                  <h4>Temperature: {weather.data[3].min_temp} ~ {weather.data[3].max_temp}°C</h4>
                  <h4>{weather.data[3].weather.description}</h4>
        </div>
        <div className='fifthDay'>
                  <div className='weather-img-mini'>
                  {weatherConditionImg(4)}
                  </div>
                  <h3>{getDayName((getDayIndex()+4)%7)}</h3>
                  <h4>Temperature: {weather.data[4].min_temp} ~ {weather.data[4].max_temp}°C</h4>
                  <h4>{weather.data[4].weather.description}</h4>
        </div>
        </div>
        )}
       </div>
       <ToastContainer />
    </div>
  );
}

export default App;
