let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forcast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let input = document.querySelector(".weather_search");


let city = "khandwa";

//input city name 
input.addEventListener('submit',(e) =>{
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    city = cityName.value;
    console.log(city);

    getweatherData();
    
    cityName.value = "";
})


//for full country name using js api Intl
const getCountryName = (code) =>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);

}

//to gatting date and time
const getDateandTime = (dt) =>{
    const curdate = new Date(dt * 1000); //converts seconds to milliseconds

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",

    };

    const formatter = new Intl.DateTimeFormat("en-Us",options);
    console.log(formatter);
    
    return formatter.format(curdate);
}

const getweatherData = async () => {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=44.34&lon=10.99&appid=c238c9964696e44db1441ff0b20703b9`;
    try{ 
        let res = await fetch(apiurl,{
            headers : {
                Accept: "application/json",
            },
        });
        let data = await res.json();
        const{ main, name, weather , wind ,sys , dt} = data;
        console.log(data);


        w_forcast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="Weather Icon">`
        

        cityName.innerHTML = `${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateandTime(data.dt);
         
        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Min: ${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_pressure.innerHTML = `${main.pressure} hpa`;
        w_wind.innerHTML = `${wind.speed} mph`;



    }catch(error){
        console.log(error);
    }
} 

document.body.addEventListener('load',getweatherData());





