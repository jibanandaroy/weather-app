import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "02n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

            const reponse = await fetch(url);

            const data = await reponse.json();
            if(!reponse.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching weather data");
        }
    }

    useEffect(() => {
        search("London")
    }, [])

    return (
        <div className='weather place-self-center p-10 rounded-2xl bg-gradient-to-tr from-blue-900 to-blue-700 flex flex-col items-center'>
            <div className="search_bar flex items-center gap-3">
                <input className='h-12 border-none outline-none rounded-3xl pl-6 text-lg' ref={inputRef} type="text" placeholder='search' />
                <img className='w-12 p-3.5 rounded-full cursor-pointer bg-slate-100' src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img className='w-40 my-7' src={weatherData.icon} alt="" />
                <p className='text-white text-7xl leading-none'>{weatherData.temperature}°c</p>
                <p className='text-white text-4xl'>{weatherData.location}</p>
                <div className="weather-data w-full mt-10 flex justify-between">
                    <div className="col flex items-start gap-3 text-xl">
                        <img className='mt-2' src={humidity_icon} alt="" />
                        <div className="text-white">
                            <p>{weatherData.humidity} %</p>
                            <span className='block text-base mt-2'>Humidity</span>
                        </div>
                    </div>
                    <div className="col col flex items-start gap-3 text-xl">
                        <img className='mt-2' src={wind_icon} alt="" />
                        <div className="text-white">
                            <p>{weatherData.windSpeed} km/h</p>
                            <span className='block text-base mt-2'>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Weather