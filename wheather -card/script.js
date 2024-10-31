
const button = document.querySelector(".button")
    button.addEventListener("click", bringData )



function bringData(e) {
    e.preventDefault()
    const card = document.querySelector(".info")
    card.innerText = ""

    const lat = document.querySelector("#latitude").value;
    const long = document.querySelector("#longtitute").value;
    


    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}.52&longitude=${long}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m&timezone=auto`)
    .then((promise) => promise.json())
    .then((data) => {

        const current = data.current;
        console.log(current)
        console.log(data.current_weather)
        const isDay = current.is_day;
        const rain = current.rain;
        const snowfall = current.snowfall;
        const temperature = current.temperature_2m;
        const windSpeed = current.wind_speed_10m;
        const time  = current.time;

        const ptemp = document.createElement("p")
        ptemp.innerText = `current temprature = ${temperature}`;

        const pwind = document.createElement("p")
        pwind.innerText = `current wind speed = ${windSpeed}`;

        const ptime= document.createElement("p");
        ptime.innerText = `Date & Time = ${time}`;

        
//    I checked only the rain and sunny conditions

        const img = document.createElement("img")
        if (isDay === 1 && rain === 1) {
            img.src = "./images/rain.jpg";
        } else if (isDay === 0 && rain === 1) {
            img.src ="./images/rainnight.jpg";
        } else if (isDay === 1 && rain === 0) {
            if (current.cloud_cover > 50) {
                img.src = "./images/cloudy.jpeg";
            }else {
                img.src = "./images/sunny.jpeg";
             }            
        } else if (isDay === 0 && rain === 0) {
            if (current.cloud_cover > 50) {
                img.src = "./images/cloudynight.jpg";
            }else {
                img.src = "./images/stars.jpeg";
             }            
        }

        card.appendChild(img);
        card.appendChild(ptemp);
        card.appendChild(pwind);
        card.appendChild(ptime);

        document.querySelector("#latitude").value = "";
        document.querySelector("#longtitute").value = "";
     
    }).catch((err) => {console.log(err)});

    
   
}

