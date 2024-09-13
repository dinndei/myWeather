import React, { useEffect,useState } from "react";
import axios from "axios";
import { Card as MuiCard, CardContent, Typography, Grid, LinearProgress } from "@mui/material";
import "./card.css";
const Card = ({ city }) => {
    const [weatherList, setWeatherList] = useState([]);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();


    let getCoords = async (city) => {
        try {
            const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8ee633956bad6ae1965b557a94ecfcba`);
            setLat(res.data[0].lat);
            setLon(res.data[0].lon);
            console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }
    let getWeatherList = async (lat, lon) => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8ee633956bad6ae1965b557a94ecfcba&units=metric&lang=he`);
            setWeatherList(res.data);
            console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

  
  useEffect(() => {
    if (city) {
      getCoords(city); 
    }
  }, [city]);

 
  useEffect(() => {
    if (lat && lon) {
      getWeatherList(lat, lon); 
    }
  }, [lat, lon]);

  const cityName = city === "Alaska" ? "אלסקה" : weatherList.name;

    return (
        <MuiCard style={{ backgroundColor: "#E3F2FD", margin: "10px" ,direction: "rtl"}}>
        <CardContent>
         
          {weatherList.main ? (
       <>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
       <Typography variant="h5" component="h2">
         {cityName}
       </Typography>
       {weatherList.main && weatherList.main.temp < 20 ? (
         <Typography variant="h6" style={{ color: "blue" }}>🧊</Typography>
       ) : weatherList.main && weatherList.main.temp > 30 ? (
         <Typography variant="h6" style={{ color: "red" }}>☀️</Typography>
       ) : (
         <Typography variant="h6" style={{ color: "green" }}>⛅</Typography>
       )}
     </div>
              
              <Typography>{weatherList.weather[0].description}</Typography>
              <Typography><strong>טמפרטורה: </strong>  {weatherList.main.temp}° C</Typography>
              <Typography><strong>מרגיש כמו: </strong> {weatherList.main.feels_like}° C</Typography>
              <Typography><strong>אחוזי לחות: </strong> % {weatherList.main.humidity}</Typography>
            
              </> ) : (
            <LinearProgress /> 
          )}
        </CardContent>
      </MuiCard>
    );
}

export default Card;