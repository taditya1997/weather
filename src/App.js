import './App.css';
import React,{ useState } from "react";

const api=
{
  base: "http://api.weatherapi.com/v1/",
  key: "5221d055d0534afb9d6125939212903"
}
function App() 
{ 
  const[weather,setWeather]=useState({});
  const[ inputValue ,changeInputValue]=useState('');

  const search=event=>
  {
   if(event.key==="Enter")
   {
   fetch(`${api.base}current.json?key=${api.key}&q=${inputValue}&aqi=no`)
   .then(res=>res.json())
   .then(result=>{
     changeInputValue('');
     setWeather(result)
    console.log(result)});
   }
  }
  const datebuilder=d=>
  {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div>
    
    <div className={(typeof weather.current != "undefined") ? ((weather.current.is_day === 1) ? 'app ' : 'app night') : 'app'}>
      <main>
      <div className="search-box">
      <input className="search-bar" value={inputValue} placeholder="Which City's Wheather Would You Like To See" name="inputValue" type="text"  onChange={event=>changeInputValue(event.target.value)} onKeyPress={search}/>
      </div>
      {(typeof weather.current!="undefined")?(
        <div>
        <div className="location-box">
      <div className="location">{weather.location.name},{weather.location.country}</div>
      <div className="date">{datebuilder(new Date())}</div>
      </div>
      <div className="weather-box">
      <div className="temp">{Math.round(weather.current.temp_c)+"°"+'c'}</div>
      <div className="weather">{weather.current.condition.text}
      </div>
      <div className="icon" style={{backgroundImage:`url(${weather.current.condition.icon})`,height: "300px", backgroundRepeat: "no-repeat",position:'relative'}}></div>
      </div>
        </div>
      ):('')}
      </main>
    </div>
    </div>
  );
}

export default App;
