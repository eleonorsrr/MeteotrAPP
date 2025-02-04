// 1. Importazione script secondari

import { soulpad, nightblade, manor, grandpiano, epiano, ephemeral, diva } from './sounds.js';
console.log( soulpad, nightblade, manor, grandpiano, epiano, ephemeral, diva );

import { scales, chords } from './scalesandchords.js';
console.log(scales, chords);

import { updateChordButtons } from "./playchordsloop.js";

// 2. Key API OpenWeather: funzione principale accesso informazioni meteo e relative funzioni interne

// Scelta della città tramite barra di ricerca
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Inserisci il nome di una città.");
  }
});

// Funzione per ottenere e visualizzare i dati meteo
function getWeatherData(city = "Milano") { // Default: Milano
  const apiKey = "3cddeb2e294c555f3933428867f617d4"; // Key API OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Città non trovata. Controlla il nome e riprova.");
    }
    return response.json();
  })

  .then(data => {
    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp-current').innerText = data.main.temp + " °C"; // Temperatura attuale
    document.getElementById('temp-min').innerText = data.main.temp_min + " °C"; // Temperatura minima
    document.getElementById('temp-max').innerText = data.main.temp_max + " °C"; // Temperatura massima
    document.getElementById('wind-speed').innerText = data.wind.speed + " m/s"; // Velocità del vento
    document.getElementById('wind-direction').innerText = data.wind.deg + "°"; // Direzione del vento
    document.getElementById('humidity').innerText = data.main.humidity + " %"; // Umidità
    document.getElementById('pressure').innerText = data.main.pressure + " hPa"; // Pressione atmosferica

    const weatherDescription = data.weather[0].description;
    document.getElementById('weather-description').innerText = weatherDescription;

    // Calcola ora locale 
    const utcTimestamp = data.dt; 
    const timezoneOffset = data.timezone; 
    const localTimestamp = utcTimestamp + timezoneOffset - 3600; 
    const localDate = new Date(localTimestamp * 1000);
    const localTime = localDate.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    }
    );
    
    document.getElementById('time-time').innerText = localTime;
    // Aggiungi la mappa geografica
    const lat = data.coord.lat; 
    const lon = data.coord.lon;
    initializeMap(lat, lon);

    const weatherCondition = getWeatherCondition(weatherDescription);
    const weatherCondition2 = getWeatherCondition2(weatherDescription);
    const randomScale = getRandomScale(weatherCondition);
    highlightWeatherButton(weatherCondition);
    updateChordButtons(randomScale.scaleType,randomScale.rootNote);
    changeBackground(weatherCondition2);
    playWeatherSound(weatherCondition);
    suggestInstrument(weatherCondition);
  }
  )

  .catch(error => {
    console.error('Errore nel recuperare i dati meteo:', error);
    alert("Errore: " + error.message);
  });
}

// Inizializzazione mappa con possibilità di scelta posizione con click
let map;

function initializeMap(lat, lon) {
  if (map) {
    map.remove();
  }

  map = L.map('map').setView([lat, lon], 10); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let marker = L.marker([lat, lon]).addTo(map)
    .bindPopup("Weather position")
    .openPopup();

  map.on('click', function (event) {
    const { lat, lng } = event.latlng;

    marker.setLatLng([lat, lng])
      .setPopupContent("Weather position")
      .openPopup();
      
    getWeatherDataByCoords(lat, lng);
  });
}

function getWeatherDataByCoords(lat, lon) {
  const apiKey = "3cddeb2e294c555f3933428867f617d4";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nel recuperare i dati meteo.");
      }
      return response.json();
    })
    .then(data => {
      // Mostra i dati nel pannello laterale
      document.getElementById('location').innerText = data.name || `Lat: ${lat}, Lon: ${lon}`;
      document.getElementById('temp-current').innerText = data.main.temp + " °C"; 
      document.getElementById('temp-min').innerText = data.main.temp_min + " °C"; 
      document.getElementById('temp-max').innerText = data.main.temp_max + " °C"; 
      document.getElementById('wind-speed').innerText = data.wind.speed + " m/s"; 
      document.getElementById('wind-direction').innerText = data.wind.deg + "°"; 
      document.getElementById('humidity').innerText = data.main.humidity + " %"; 
      document.getElementById('pressure').innerText = data.main.pressure + " hPa"; 

      const weatherDescription = data.weather[0].description;
      document.getElementById('weather-description').innerText = weatherDescription;

      // Calcola l'ora locale
      const utcTimestamp = data.dt;
      const timezoneOffset = data.timezone;
      const localTimestamp = utcTimestamp + timezoneOffset - 3600; 

      const localDate = new Date(localTimestamp * 1000);
      const localTime = localDate.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      document.getElementById('time-time').innerText = localTime;

      const weatherCondition = getWeatherCondition(weatherDescription);
      const weatherCondition2 = getWeatherCondition2(weatherDescription);

      const randomScale = getRandomScale(weatherCondition);
      highlightWeatherButton(weatherCondition);
      updateChordButtons(randomScale.scaleType, randomScale.rootNote);
      changeBackground(weatherCondition2);
      playWeatherSound(weatherCondition);
      suggestInstrument(weatherCondition);
    })
    .catch(error => {
      console.error('Errore nel recuperare i dati meteo:', error);
      alert("Errore: " + error.message);
    });
}

getWeatherData();

// 2.1.1 Categorie di descrizioni meteo per associazione agli accordi
const weatherCategories = {
  sunny: [
    "clear sky"
  ],
  rainy: [
    "light rain", "light intensity shower rain", "light thunderstorm", "thunderstorm with light rain", "light intensity drizzle", "light intensity drizzle rain", "thunderstorm with light drizzle",
    "moderate rain", "shower rain", "drizzle rain", "drizzle", "shower drizzle", "thunderstorm with rain", "thunderstorm", "light intensity shower rain and drizzle", "thunderstorm with drizzle",
    "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "heavy intensity shower rain", "ragged shower rain", "thunderstorm with heavy rain", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with heavy drizzle", "heavy intensity drizzle", "heavy intensity drizzle rain", "heavy shower rain and drizzle"
  ],
  cloudy: [
    "few clouds", "scattered clouds", "broken clouds", "overcast clouds", "mist", "smoke", "haze", "fog", "dust"
  ],
  snowy: [
    "light snow", "light shower sleet", "light rain and snow", "light shower snow",
    "snow", "sleet", "shower sleet", "rain and snow", "shower snow",
    "heavy snow", "heavy shower snow"
  ]
};

// 2.1.2 Categorie di descrizioni meteo per cambiare background
const weatherCategories2 = {
  clear: ["clear sky"],
  lowrain: [
    "light rain", "light intensity shower rain", "light thunderstorm", 
    "thunderstorm with light rain", "light intensity drizzle", 
    "light intensity drizzle rain", "thunderstorm with light drizzle"
  ],
  mediumrain: [
    "moderate rain", "shower rain", "drizzle rain", "drizzle", 
    "shower drizzle", "thunderstorm with rain", "thunderstorm", 
    "light intensity shower rain and drizzle", "thunderstorm with drizzle"
  ],
  highrain: [
    "heavy rain", "heavy shower rain", "heavy intensity rain"
  ],
  fewclouds: [
    "few clouds", "scattered clouds", "broken clouds"
  ],
  mediumclouds: [
    "overcast clouds", "mist", "smoke"
  ],
  manyclouds: [
    "haze", "fog", "dust"
  ],
  lowsnow: [
    "light snow", "light shower sleet", "light rain and snow", 
    "light shower snow"
  ],
  mediumsnow: [
    "snow", "sleet", "shower sleet", "rain and snow", "shower snow"
  ],
  highsnow: [
    "heavy snow", "heavy shower snow"
  ]
};

// 2.2.1 Funzione per associare la descrizione meteo ad una delle 4 condizioni meteo generali
function getWeatherCondition(weatherDescription) {
  const description = weatherDescription.toLowerCase();

  if (weatherCategories.sunny.some(keyword => description.includes(keyword))) {
    return "sunny";
  } else if (weatherCategories.rainy.some(keyword => description.includes(keyword))) {
    return "rainy";
  } else if (weatherCategories.cloudy.some(keyword => description.includes(keyword))) {
    return "cloudy";
  } else if (weatherCategories.snowy.some(keyword => description.includes(keyword))) {
    return "snowy";
  }
}

// 2.2.2 Funzione per associare la descrizione meteo ad una delle 10 condizioni che determinano il background
function getWeatherCondition2(weatherDescription) {
  const description2 = weatherDescription.toLowerCase();

  if (weatherCategories2.clear.some(keyword => description2.includes(keyword))) {
    return "clear";

  } else if (weatherCategories2.lowrain.some(keyword => description2.includes(keyword))) {
    return "lowrain";
  } else if (weatherCategories2.mediumrain.some(keyword => description2.includes(keyword))) {
    return "mediumrain";
  } else if (weatherCategories2.highrain.some(keyword => description2.includes(keyword))) {
    return "highrain";

  } else if (weatherCategories2.fewclouds.some(keyword => description2.includes(keyword))) {
    return "fewclouds";
  } else if (weatherCategories2.mediumclouds.some(keyword => description2.includes(keyword))) {
    return "mediumclouds";
  } else if (weatherCategories2.manyclouds.some(keyword => description2.includes(keyword))) {
    return "manyclouds";

  } else if (weatherCategories2.lowsnow.some(keyword => description2.includes(keyword))) {
    return "lowsnow";
  } else if (weatherCategories2.mediumsnow.some(keyword => description2.includes(keyword))) {
    return "mediumsnow";
  } else if (weatherCategories2.highsnow.some(keyword => description2.includes(keyword))) {
    return "highsnow";
  }
}

// 2.3.1. Funzione per selezionare una scala casuale in base alla condizione meteo
function getRandomScale(weatherCondition) {
  let scaleType;
  switch (weatherCondition) {
    case "sunny":
      scaleType = "major";
      break;
    case "rainy":
      scaleType = "minor";
      break;
    case "cloudy":
      scaleType = "sus4";
      break;
    case "snowy":
      scaleType = "major7";
      break;
    default:
      scaleType = "major";
      break;
  }

  const rootNotes = Object.keys(scales[scaleType]); 
  const randomRootNote = rootNotes[Math.floor(Math.random() * rootNotes.length)];
  return { scaleType, rootNote: randomRootNote };
  
}

// 2.3.2 Funzione per cambiare il background in base alla condizione meteo
const images = {
  clear: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/clearsky.GIF',
  lowrain: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/lowrain.GIF',
  mediumrain: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumrain.GIF',
  highrain: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/highrain.GIF',
  fewclouds: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/fewclouds.GIF',
  mediumclouds: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumclouds.GIF',
  manyclouds: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/manyclouds.GIF',
  lowsnow: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/lowsnow.GIF',
  mediumsnow: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumsnow.GIF',
  highsnow: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/highsnow.GIF'
};

Object.values(images).forEach(gifUrl => {
  const img = new Image();
  img.src = gifUrl;
});

function changeBackground(weatherCondition2) {
  let gifUrl;

  switch (weatherCondition2) {
    case "clear":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/clearsky.GIF';
      break;
    case "lowrain":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/lowrain.GIF';
      break;
    case "mediumrain":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumrain.GIF';
      break;
    case "highrain":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/highrain.GIF';
      break;
    case "fewclouds":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/fewclouds.GIF';
      break;
    case "mediumclouds":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumclouds.GIF';
      break;
    case "manyclouds":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/manyclouds.GIF';
      break;
    case "lowsnow":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/lowsnow.GIF';
      break;
    case "mediumsnow":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumsnow.GIF';
      break;
    case "highsnow":
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/highsnow.GIF';
      break;
    default:
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sfondo.jpg';
      break;
  }

  const backgroundContainer = document.getElementById('background-container');
  backgroundContainer.style.opacity = 0;

  setTimeout(() => {
    backgroundContainer.style.backgroundImage = `url(${gifUrl})`;
    backgroundContainer.style.backgroundSize = 'cover';
    backgroundContainer.style.backgroundPosition = 'center';
    backgroundContainer.style.backgroundRepeat = 'no-repeat';
    backgroundContainer.style.opacity = 1;
  }, 1000);
}


// 3. Funzioni e/o logica per la gestione dell'applicazione

// 3.1 Scelta strumento
let currentNotes = grandpiano; 
document.getElementById('instruments').addEventListener('change', (event) => {

  const selectedInstrument = event.target.value;

  if (selectedInstrument === 'grandpiano') {
    currentNotes = grandpiano;

  } else if (selectedInstrument === 'nightblade') {
    currentNotes = nightblade;

  } else if (selectedInstrument === 'epiano') {
    currentNotes = epiano;

  } else if (selectedInstrument === 'ephemeral') {
    currentNotes = ephemeral;

  } else if (selectedInstrument === 'diva') {
    currentNotes = diva;

  } else if (selectedInstrument === 'manor') {
    currentNotes = manor;

  } else if (selectedInstrument === 'soulpad') {
    currentNotes = soulpad;
  } 

});

// 3.2 Riproduzione di un accordo
export function playChord(chord) { 

  if (chords[chord]) {

    chords[chord].forEach(note => {
      const audio = currentNotes[note]; 
      
      if (audio) {

        audio.currentTime = 0; 
        audio.play(); 
      }
    });
  }
}

document.querySelectorAll('.chord-row').forEach(button => {

  button.addEventListener('click', (event) => {

    const chord = event.target.dataset.chord; 

    if (chord) {
      playChord(chord);
    }
  });

});

// 3.3 Creazione e aggiornamento del menù a tendina (+ scelta della scala)
function createDropdown(scaleType, weatherButton) {

  if (weatherButton.nextElementSibling && weatherButton.nextElementSibling.tagName === "SELECT") {
    return;
  }

  const dropdownContainer = document.createElement("select");
  dropdownContainer.classList.add("dropdownContainer");

  const scaleKeys = Object.keys(scales[scaleType]);
  
  scaleKeys.forEach(note => {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    dropdownContainer.appendChild(option);
  });
  
  if (scaleKeys.length > 0) {
    dropdownContainer.value = scaleKeys[0];
    updateChordButtons(scaleType, scaleKeys[0]); 
  }

  dropdownContainer.addEventListener("change", () => {
    updateChordButtons(scaleType, dropdownContainer.value); 
    simulateWeatherButtonClick(scaleType);
  });

  dropdownContainer.addEventListener("click", () => {
    const currentValue = dropdownContainer.value;
    dropdownContainer.value = "";
    setTimeout(() => {
      dropdownContainer.value = currentValue;
      updateChordButtons(scaleType, currentValue);
    }, 1);
  });

  weatherButton.parentElement.insertBefore(dropdownContainer, weatherButton.nextSibling);
}

function simulateWeatherButtonClick(scaleType) {
  const weatherMapping = {
    'major': "sunny",
    'minor': "rainy",
    'sus4': "cloudy",
    'major7': "snowy"
  };

  const correspondingWeather = weatherMapping[scaleType];
  if (correspondingWeather) {
    const weatherButton = document.getElementById(correspondingWeather);
    if (weatherButton) {
      weatherButton.click();
    }
  }
}

// 4. Assegnazione degli eventi ai pulsanti

const weatherButtons = {
  sunny: document.getElementById("sunny"),
  rainy: document.getElementById("rainy"),
  cloudy: document.getElementById("cloudy"),
  snowy: document.getElementById("snowy")
};

const weatherScales = {
  sunny: "major",
  rainy: "minor",
  cloudy: "sus4",
  snowy: "major7"
};

Object.entries(weatherButtons).forEach(([weather, button]) => {
  createDropdown(weatherScales[weather], button);
});

// 4.1 Cambio dello sfondo al click di uno dei weather-buttons
function changeBackground2(weather) {
  let imageUrl;

  const backgroundContainer = document.getElementById('background-container');
  backgroundContainer.style.opacity = 0;

  setTimeout(() => {
    switch(weather) {
      default:
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sfondo.jpg';
        break;
      case 'sunnyy':
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/clearsky.GIF'; 
        break;
      case 'rainyy':
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/lowrain.GIF';
        break;
      case 'cloudyy':
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/mediumclouds.GIF'; 
        break;
      case 'snowyy':
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/highsnow.GIF'; 
        break;
    }

    backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
    backgroundContainer.style.backgroundSize = 'cover';
    backgroundContainer.style.backgroundPosition = 'center';
    backgroundContainer.style.backgroundRepeat = 'no-repeat';
    backgroundContainer.style.opacity = 1;
  }, 1000); 
}
weatherButtons.sunny.addEventListener("click", () => {
  changeBackground2("sunnyy", weatherButtons.sunny);
});

weatherButtons.rainy.addEventListener("click", () => {
  changeBackground2("rainyy", weatherButtons.rainy);
});

weatherButtons.cloudy.addEventListener("click", () => {
  changeBackground2("cloudyy", weatherButtons.cloudy);
});

weatherButtons.snowy.addEventListener("click", () => {
  changeBackground2("snowyy", weatherButtons.snowy);
});

function resetButtons(except) {
  Object.values(weatherButtons).forEach(button => {
    if (button !== except) button.classList.remove("soundactive");
  });
}

Object.entries(weatherButtons).forEach(([weather, button]) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".weather-btn").forEach(btn => btn.classList.remove("scaleactive"));

    const isActive = button.classList.contains("soundactive");
    resetButtons(button);
    button.classList.toggle("soundactive", !isActive);

    highlightWeatherButton(weather);
    playWeatherSound(weather);
    suggestInstrument(weather);
  });
});

function highlightWeatherButton(condition) {
  document.querySelectorAll(".weather-btn").forEach(button => {
    button.classList.remove("scaleactive");
  });

  const activeButton = document.querySelector(`.weather-btn.${condition}`);
  if (activeButton) {
    activeButton.classList.add("scaleactive");
  }
}

const weatherSounds = {
  sunny: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/birds.mp3'),
  rainy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/rain.mp3'),
  cloudy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/wind.mp3'),
  snowy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/snow.mp3')
};

let currentSound = null; 

function playWeatherSound(weather) {
  let sound = weatherSounds[weather];
  if (!sound) {
    console.error("Suono non trovato per", weather);
    return;
  }

  if (currentSound && currentSound !== sound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  if (currentSound !== sound) {
    sound.loop = true;
    sound.currentTime = 0;
    sound.play();

    const volumeSlider = document.getElementById(`${weather}-volume`);
    if (volumeSlider) {
      sound.volume = parseFloat(volumeSlider.value);
      volumeSlider.addEventListener("input", () => {
        sound.volume = parseFloat(volumeSlider.value);
      });
    }
    currentSound = sound;
  } else {
    sound.pause();
    sound.currentTime = 0;
    currentSound = null;
  }
}

const weatherInstruments = {
  sunny: "*suggestion: Manor Grand",
  rainy: "*suggestion: Grand Piano",
  cloudy: "*suggestion: Soul Pad",
  snowy: "*suggestion: Epiano"
};

function suggestInstrument(weather) {
  const suggestionContainer = document.getElementById("instrument-suggestion");
  if (!suggestionContainer) return;

  const suggestionText = weatherInstruments[weather];
  suggestionContainer.textContent = suggestionText ? suggestionText : "Strumento non disponibile per questa condizione meteo.";
}
