import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import requestIp from 'request-ip';
import axios from "axios";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(requestIp.mw())

const today = new Date();
let dayNum = today.getDate();
let monthNum = today.getMonth() + 1;
let yearNum = today.getFullYear();
const weekArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let actualWeekDay = today.getDay();
let weekDay = weekArray[actualWeekDay];


let tomorrow = weekArray[actualWeekDay + 1] ;
let twodays = weekArray [actualWeekDay + 2] ;
let threedays = weekArray[actualWeekDay + 3] ;
let fourdays = weekArray[actualWeekDay + 4];
let fivedays = weekArray[actualWeekDay + 5];

console.log(tomorrow);
console.log(twodays);
console.log(threedays);
console.log(fourdays);
console.log(fivedays);

/* APIs */
/*
const weatherNow = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const weatherForward = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}';
const geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
const fiveDayCast = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}.34&lon={lon}.99&appid=appid=d33f48536697d391c1fd234c4b682662'
/*This is the server on port 3000 */

app.listen(port, () => {
    console.log("Server running.")
});

app.get("/", async ( req, res ) => {
try{
    //const response = await axios.get('http://ip-api.com/json/'+ req.clientIp);
    const response = await axios.get('http://ip-api.com/json/'+ '24.48.0.1');
    const result = response.data;
    let latitude = Math.round(result.lat);
    let longitude = Math.round(result.lon);
    const resultTwo = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=d33f48536697d391c1fd234c4b682662');
    
    const weatherDescription = resultTwo.data.weather[0].description;
    const callFiveDay = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=d33f48536697d391c1fd234c4b682662');

    const iconData = resultTwo.data.weather[0].icon;
    const iconId = "http://openweathermap.org/img/w/" + iconData + ".png";

    const iconData2 = callFiveDay.data.list[3].weather[0].icon;
    const iconId2 = "http://openweathermap.org/img/w/" + iconData2 + ".png";

    const iconData3 = callFiveDay.data.list[7].weather[0].icon;
    const iconId3 = "http://openweathermap.org/img/w/" + iconData3 + ".png";

    const iconData4 = callFiveDay.data.list[11].weather[0].icon;
    const iconId4 = "http://openweathermap.org/img/w/" + iconData4 + ".png";

    const iconData5 = callFiveDay.data.list[15].weather[0].icon;
    const iconId5 = "http://openweathermap.org/img/w/" + iconData5 + ".png";

    const iconData6 = callFiveDay.data.list[19].weather[0].icon;
    const iconId6 = "http://openweathermap.org/img/w/" + iconData6 + ".png";

    const iconData7 = callFiveDay.data.list[23].weather[0].icon;
    const iconId7 = "http://openweathermap.org/img/w/" + iconData7 + ".png";

    res.render("index1.ejs" ,
    {DataReceived: resultTwo.data,
    day: dayNum,
    month: monthNum,
    year: yearNum,
    latitudeNum: latitude,
    longitudeNum: longitude,
    icon: iconId,
    icon2: iconId2,
    icon3:iconId3,
    icon4:iconId4,
    icon5:iconId5,
    icon6:iconId6,
    icon7:iconId7,
    tomorrow:tomorrow,
    twodays:twodays,
    threedays:threedays,
    fourdays:fourdays,
    fivedays:fivedays,
    description: weatherDescription,
    temperature: Math.round(resultTwo.data.main.temp - 273.15),
    maxTemp: Math.round(resultTwo.data.main.temp_max - 273.15),
    minTemp: Math.round(resultTwo.data.main.temp_min - 273.15),
    feelsLike: Math.round(resultTwo.data.main.feels_like - 273.15),
    city: resultTwo.data.name,
    dayOfWeek : weekDay,
});
console.log(callFiveDay.data.list[3].weather[0].icon)
} catch(error) {
    console.error("Failed to make a request", error.message);
    res.render ("index1.ejs")
} });
 


app.post("/submit", async (req, res) => {
    try {
    const responseSubmit = await axios.get ('http://api.openweathermap.org/geo/1.0/direct?q=' + req.body["city-name"] + '&appid=d33f48536697d391c1fd234c4b682662');
    const latitude = Math.round(responseSubmit.data[0].lat);
    const longitude = Math.round(responseSubmit.data[0].lon);
    const responseSubmitWeather = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=d33f48536697d391c1fd234c4b682662');
    const iconData = responseSubmitWeather.data.weather[0].icon;
    const iconId = "http://openweathermap.org/img/w/" + iconData + ".png"
    const weatherDescription = responseSubmitWeather.data.weather[0].description;
    const callFiveDay = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=d33f48536697d391c1fd234c4b682662');

    const iconData2 = callFiveDay.data.list[4].weather[0].icon;
    const iconId2 = "http://openweathermap.org/img/w/" + iconData2 + ".png";

    const iconData3 = callFiveDay.data.list[8].weather[0].icon;
    const iconId3 = "http://openweathermap.org/img/w/" + iconData3 + ".png";

    const iconData4 = callFiveDay.data.list[12].weather[0].icon;
    const iconId4 = "http://openweathermap.org/img/w/" + iconData4 + ".png";

    const iconData5 = callFiveDay.data.list[16].weather[0].icon;
    const iconId5 = "http://openweathermap.org/img/w/" + iconData5 + ".png";

    const iconData6 = callFiveDay.data.list[20].weather[0].icon;
    const iconId6 = "http://openweathermap.org/img/w/" + iconData6 + ".png";

    const iconData7 = callFiveDay.data.list[24].weather[0].icon;
    const iconId7 = "http://openweathermap.org/img/w/" + iconData7 + ".png";
    res.render("index2.ejs",{ 
     city: responseSubmit.data[0].name,
     day: dayNum,
     month: monthNum,
     year: yearNum,
     latitude: latitude,
     longitude: longitude,
     icon: iconId,
     icon2: iconId2,
     icon3:iconId3,
     icon4:iconId4,
     icon5:iconId5,
     icon6:iconId6,
     icon7:iconId7,
     description: weatherDescription,
     temperature: Math.round(responseSubmitWeather.data.main.temp - 273.15 ),
     feelsLike: Math.round(responseSubmitWeather.data.main.feels_like - 273.15),
     maxtemp: Math.round(responseSubmitWeather.data.main.temp_max - 273.15),
     mintemp: Math.round(responseSubmitWeather.data.main.temp_min - 273.15),
     tomorrow:tomorrow,
    twodays:twodays,
    threedays:threedays,
    fourdays:fourdays,
    fivedays:fivedays,
    })
     

    } catch(error) {
       
        const response = await axios.get('http://ip-api.com/json/'+ '24.48.0.1');
        const result = response.data;
        let latitude = Math.round(result.lat);
        let longitude = Math.round(result.lon);
        const resultTwo = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=d33f48536697d391c1fd234c4b682662');
        const iconData = resultTwo.data.weather[0].icon;
        const iconId = "http://openweathermap.org/img/w/" + iconData + ".png"
        // alert("Could not recognize the city, please try again")  This only works in browser;
        console.log("Something went wrong, try again")
            res.render("index1.ejs" ,
            {DataReceived: resultTwo.data,
            description: resultTwo.data.weather[0].description,
            day: dayNum,
            month: monthNum,
            year: yearNum,
            latitudeNum: latitude,
            longitudeNum: longitude,
            icon: iconId,
            temperature: Math.round(resultTwo.data.main.temp - 273.15),
            maxTemp: Math.round(resultTwo.data.main.temp_max - 273.15),
            minTemp: Math.round(resultTwo.data.main.temp_min - 273.15),
            feelsLike: Math.round(resultTwo.data.main.feels_like - 273.15),
            city: resultTwo.data.name}
            
        )}
        });