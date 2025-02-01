// 1. Importazione script secondari

// 1.1 Acquisizione, mappatura e preload dei campioni audio
import { soulpad, nightblade, manor, ganymede } from './sounds.js';
console.log(soulpad, nightblade, manor, ganymede);

// 1.2.1 Definizione e mappatura di scale e accordi
import { scales, chords } from './scalesandchords.js';
console.log(scales, chords);

// 1.2.2 Definizione e mappatura accordi nella tendina
import { getChordName } from "./chordmapping.js";
console.log(getChordName);

// 1.3 Key API OpenWeather: ottieni dati, ottieni scala in base a dati ottenuti e cambia sfondo in base a dati ottenuti

// Scelta della città
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Inserisci il nome di una città.");
  }
});

// Variabile globale per la mappa
let map;

function initializeMap(lat, lon) {
  // Se la mappa esiste già, rimuovila prima di crearne una nuova
  if (map) {
    map.remove();
  }

  // Crea una nuova mappa e impostala sulle nuove coordinate
  map = L.map('map').setView([lat, lon], 10);  // 10 è il livello di zoom

  // Aggiungi una tile layer (mappa base)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Aggiungi un marcatore alla posizione
  L.marker([lat, lon]).addTo(map)
    .bindPopup("Weather position")
    .openPopup();
}


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
    // Mostra i dati nel pannello laterale
    document.getElementById('location').innerText = data.name;
    document.getElementById('temp-current').innerText = data.main.temp + " °C"; // Temperatura attuale
    document.getElementById('temp-min').innerText = data.main.temp_min + " °C"; // Temperatura minima
    document.getElementById('temp-max').innerText = data.main.temp_max + " °C"; // Temperatura massima
    document.getElementById('wind-speed').innerText = data.wind.speed + " m/s"; // Velocità del vento
    document.getElementById('wind-direction').innerText = data.wind.deg + "°"; // Direzione del vento
    document.getElementById('humidity').innerText = data.main.humidity + " %"; // Umidità
    document.getElementById('pressure').innerText = data.main.pressure + " hPa"; // Pressione atmosferica
    
    // Mostra descrizione delle condizioni meteo
    const weatherDescription = data.weather[0].description;
    document.getElementById('weather-description').innerText = weatherDescription;

    // Calcola l'ora locale usando l'offset timezone
    const utcTimestamp = data.dt; // Tempo UTC in secondi
    const timezoneOffset = data.timezone; // Offset in secondi
    const localTimestamp = utcTimestamp + timezoneOffset - 3600; // Tempo locale in secondi

    // Converte il timestamp locale in un oggetto Date
    const localDate = new Date(localTimestamp * 1000);
          
    // Formatta l'ora locale in un formato leggibile
    const localTime = localDate.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    }
    );
          
    // Mostra l'ora locale nel pannello laterale
    document.getElementById('time-time').innerText = localTime;
    
        // Aggiungi la mappa geografica
        const lat = data.coord.lat; // Latitudine
        const lon = data.coord.lon; // Longitudine
        initializeMap(lat, lon);

    // Usa la funzione per determinare la condizione meteo
    const weatherCondition = getWeatherCondition(weatherDescription);
    const weatherCondition2 = getWeatherCondition2(weatherDescription);


    // Seleziona una scala casuale in base alla condizione meteo
    const randomScale = getRandomScale(weatherCondition);
    highlightWeatherButton(weatherCondition);

    // Funzione che aggiorna accordi visualizzati
    updateChordButtons(randomScale.scaleType,randomScale.rootNote);


    // Chiama funzione che aggiorna background
    changeBackground(weatherCondition2);
  }
  )

  .catch(error => {
    console.error('Errore nel recuperare i dati meteo:', error);
    alert("Errore: " + error.message);
  });
}


// Carica i dati meteo per una città predefinita quando la pagina è pronta
getWeatherData();


// 1.4.1 Categorie di descrizioni meteo per associazione agli accordi
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

// 1.4.2 Categorie di descrizioni meteo per cambiare background
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

// 1.5.1 Funzione per associare la descrizione meteo ad una delle 4 condizioni meteo generali
function getWeatherCondition(weatherDescription) {
  const description = weatherDescription.toLowerCase();

  // Controlla in quale categoria rientra la descrizione
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

// 1.5.2 Funzione per associare la descrizione meteo ad una delle 10 condizioni che determinano il background
function getWeatherCondition2(weatherDescription) {
  const description2 = weatherDescription.toLowerCase();

  // Controlla in quale categoria rientra la descrizione
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


// 1.6.1 Funzione per selezionare una scala casuale in base alla condizione meteo
function getRandomScale(weatherCondition) {
  let scaleType;

  // Associa la condizione meteo al tipo di scala
  switch (weatherCondition) {
    case "sunny":
      scaleType = "major"; // Scala maggiore
      break;
    case "rainy":
      scaleType = "minor"; // Scala minore
      break;
    case "cloudy":
      scaleType = "sus4"; // Scala sus4
      break;
    case "snowy":
      scaleType = "major7"; // Scala major7
      break;
    default:
      scaleType = "major"; // Default
      break;
  }

  
  // Recupera tutte le root notes disponibili per la scala
  const rootNotes = Object.keys(scales[scaleType]); // `scales` è un oggetto globale predefinito
  const randomRootNote = rootNotes[Math.floor(Math.random() * rootNotes.length)];

  // Ritorna sia il tipo di scala che la root note selezionata
  return { scaleType, rootNote: randomRootNote };
  
}



// 1.6.2 Funzione per cambiare il background in base alla condizione meteo

// Preload delle immagini per non aver delay
const images = {
  clear: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sunny.jpg',
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
      gifUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sunny.jpg';
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

  // 1. Recupera il div per lo sfondo
  const backgroundContainer = document.getElementById('background-container');
  
  // 2. Imposta l'opacità a 0 per iniziare la dissolvenza
  backgroundContainer.style.opacity = 0;

  // 3. Imposta un timeout per il cambio immagine dopo la dissolvenza
  setTimeout(() => {
    // 4. Cambia l'immagine di sfondo
    backgroundContainer.style.backgroundImage = `url(${gifUrl})`;
    backgroundContainer.style.backgroundSize = 'cover';
    backgroundContainer.style.backgroundPosition = 'center';
    backgroundContainer.style.backgroundRepeat = 'no-repeat';

    // 5. Ristabilisci l'opacità a 1 per mostrare la nuova immagine
    backgroundContainer.style.opacity = 1;
  }, 1000);  // La durata della dissolvenza (1 secondo)
}







// 2. Funzioni e/o logica per la gestione dell'applicazione

// 2.1 Logica gestione cambio strumento
let currentNotes = manor; // Assegnazione dei dati (note .wav) contenuti in rhodes ad una variabile globale (strumento attivo di default)

document.getElementById('instruments').addEventListener('change', (event) => {

  const selectedInstrument = event.target.value; // Rappresenta il valore attuale dell'elemento HTML che ha generato l'evento (lo strumento selezionato)

  if (selectedInstrument === 'manor') {
    currentNotes = manor;

  } else if (selectedInstrument === 'nightblade') {
    currentNotes = nightblade;

  } else if (selectedInstrument === 'ganymede') {
    currentNotes = ganymede;

  } else if (selectedInstrument === 'soulpad') {
    currentNotes = soulpad;
  } 

});

// 2.2 Riproduzione di un accordo
function playChord(chord) { 

  if (chords[chord]) { // Esegue il blocco se l'accordo "chord" è presente in chords

    chords[chord].forEach(note => {
      
      const audio = currentNotes[note]; // Recupera l'oggetto audio associato alla nota corrente da currentNotes
      
      if (audio) {

        audio.currentTime = 0; // Resetta l'audio per fare partire il suono dall'inizio
        audio.play(); // Avvia la riproduzione del suono associato alla nota corrente

      }

    });

  }

}

// 2.3 Creazione e aggiornamento del menù a tendina (+ scelta della scala)
function createDropdown(scaleType, weatherButton) {

  if (weatherButton.nextElementSibling && weatherButton.nextElementSibling.tagName === "SELECT") {
    return; // Verifica che il pulsante weatherButtons abbia già "SELECT" come elemento successivo
  }

  const dropdownContainer = document.createElement("select"); // Crea un elemento di tipo "select" per il menù a tendina
  dropdownContainer.classList.add("dropdownContainer");

  const scaleKeys = Object.keys(scales[scaleType]); // Array con tutte le scale disponibili per la scalaType selezionata
  
  scaleKeys.forEach(note => {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    dropdownContainer.appendChild(option); // Aggiunge l'elemento appena creato al menù a tendina
  });
  
  if (scaleKeys.length > 0) {
    dropdownContainer.value = scaleKeys[0]; // Imposta la prima scala
    updateChordButtons(scaleType, scaleKeys[0]); // Imposta automaticamente la prima scala disponibile nell'array quando si preme su weatherButton la prima volta
  }

  dropdownContainer.addEventListener("change", () => {
    updateChordButtons(scaleType, dropdownContainer.value); // Cambia gli accordi proposti ogni volta che viene selezionata una nuova opzione dal menù a tendina
    simulateWeatherButtonClick(scaleType);
  });

  // 🔴 **Forza l'aggiornamento anche se si seleziona la stessa opzione**
  dropdownContainer.addEventListener("click", () => {
    const currentValue = dropdownContainer.value;
    dropdownContainer.value = ""; // Resetta temporaneamente il valore
    setTimeout(() => {
      dropdownContainer.value = currentValue; // Ripristina il valore
      updateChordButtons(scaleType, currentValue); // Forza aggiornamento
    }, 1);
  });

  weatherButton.parentElement.insertBefore(dropdownContainer, weatherButton.nextSibling); // Aggiunge il menù a tendina creato al DOM (dopo il pulsante weatheButtons)
}

// 🔵 Funzione per simulare il click sul pulsante meteo corrispondente
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



// Pullata Bande 31/01: modifica alle logiche updateChordButtons, toggleChordSelection, updateSelectedChordsDisplay

// 2.4 Aggiornamento degli accordi in relazione alla scala scelta
const chordButtonsContainer = document.querySelector(".chord-row");

function updateChordButtons(scaleType, rootNote) {

  const selectedScale = scales[scaleType][rootNote]; // ScaleType=major/minor/sus4/major7; rootNote=C,D,E..
  chordButtonsContainer.innerHTML = ""; // Svuota i tasti esistenti

  if (selectedScale) { // Verifica che la scala selezionata sia tra quelle definite

    selectedScale.forEach(note => {

      const button = document.createElement("button"); // Crea un elemento HTML button (pulsante)
      button.classList.add("chord-btn"); // Aggiunge una classe a tale pulsante 
      button.textContent = getChordName(note);
      button.dataset.chord = note; // Aggiunge un attributo personalizzato data-chord a tale pulsante

      button.addEventListener("click", () => {
        toggleChordSelection(button); // All'evento (click) passa il pulsante creato come argomento (seleziona l'accordo)
      });

      chordButtonsContainer.appendChild(button); // Aggiunge il pulsante appena creato al contenitore dei pulsanti degli accordi

    });

  } else {
    console.error("Scala non trovata per", scaleType, rootNote);
  }

}

// 2.5 Selezione/Deselezione di un accordo
const selectedChords = [];

function toggleChordSelection(button) {

  const selectedChord = button.dataset.chord; // Recupera il valore dell'attributo data-chord
  
  selectedChords.push(selectedChord); // Aggiunge l'accordo all'array

  updateSelectedChordsDisplay();
}


// 2.6 Aggiornamento visualizzazione degli accordi selezionati
const bottomPanelSlots = document.querySelectorAll(".bottom-panel .chord-slot");

function updateSelectedChordsDisplay() {
  selectedChords.forEach((chord, index) => {
    if (index < bottomPanelSlots.length-1) { // Evita di superare il numero massimo di slot (8)
      const slot = bottomPanelSlots[index];
      let chordButton = slot.querySelector("button");

      if (!chordButton) {
        // Se il bottone non esiste, lo crea
        chordButton = document.createElement("button");
        chordButton.classList.add("chord-btn");
        slot.appendChild(chordButton);

        // Aggiunge l'evento di rimozione solo alla creazione
        chordButton.addEventListener("click", () => removeChordFromSequence(index));
      }

      // Aggiorna il contenuto del bottone senza ricrearlo
      chordButton.textContent = getChordName(chord);
      chordButton.dataset.chord = chord;
    }
  });

  // Rimuove eventuali accordi in eccesso
  for (let i = selectedChords.length; i < bottomPanelSlots.length-1; i++) {
    bottomPanelSlots[i].innerHTML = "";
  }
  
  ensureShuffleButton(); // 🟢 Mantiene il bottone shuffle visibile
  enableDragAndDrop(); // 🟢 ABILITA DRAG & DROP SOLO SUGLI ELEMENTI AGGIORNATI
}


function removeChordFromSequence(index) {
  selectedChords.splice(index, 1); // Rimuove l'accordo selezionato in base all'indice
  updateSelectedChordsDisplay(); // Aggiorna la UI
}

// Drag & Drop per riordinare gli accordi selezionati

let draggedElement = null;
let draggedIndex = null;

function enableDragAndDrop() {
  const chordSlots = document.querySelectorAll(".bottom-panel .chord-slot");

  chordSlots.forEach((slot, index) => {
    const button = slot.querySelector("button");
    if (!button) return; // Se il contenitore è vuoto, salta

    button.setAttribute("draggable", true);

    // Rimuovi i listener precedenti prima di aggiungerli per evitare duplicazioni
    button.removeEventListener("dragstart", dragStartHandler);
    button.addEventListener("dragstart", dragStartHandler);

    slot.removeEventListener("dragover", dragOverHandler);
    slot.addEventListener("dragover", dragOverHandler);

    slot.removeEventListener("drop", dropHandler);
    slot.addEventListener("drop", dropHandler);

    button.removeEventListener("dragend", dragEndHandler);
    button.addEventListener("dragend", dragEndHandler);
  });
}

// Funzione per avviare il trascinamento
function dragStartHandler(event) {
  draggedElement = event.target; // Memorizza l'elemento trascinato
  draggedIndex = [...document.querySelectorAll(".bottom-panel .chord-slot button")].indexOf(draggedElement);
  event.dataTransfer.effectAllowed = "move";
  setTimeout(() => {
    draggedElement.style.opacity = "0.5";
  }, 0);
}

// Permette il drop e aggiunge uno stile visivo
function dragOverHandler(event) {
  event.preventDefault();
  event.target.classList.add("drag-over");
}

// Gestisce il rilascio dell'elemento e lo sposta nella posizione corretta
function dropHandler(event) {
  event.preventDefault();
  event.target.classList.remove("drag-over");

  // Recupera l'indice corretto dell'elemento target
  const chordButtons = [...document.querySelectorAll(".bottom-panel .chord-slot button")];
  const targetIndex = chordButtons.indexOf(event.target);

  if (draggedIndex !== targetIndex && targetIndex !== -1) {
    swapChords(draggedIndex, targetIndex);
  }
}

// Funzione per concludere il trascinamento
function dragEndHandler() {
  if (draggedElement) {
    draggedElement.style.opacity = "1";
  }
  draggedElement = null;
  draggedIndex = null;
}

// 🔄 Sposta l'accordo selezionato e fa scalare gli altri
function swapChords(fromIndex, toIndex) {
  if (fromIndex === toIndex) return; // Se la posizione di partenza è la stessa della destinazione, non fare nulla

  let movedChord = selectedChords[fromIndex]; // Prende l'accordo da spostare

  // Rimuove l'elemento da `fromIndex` e spostalo a `toIndex`
  selectedChords.splice(fromIndex, 1); 
  selectedChords.splice(toIndex, 0, movedChord);

  // Ottimizzazione per evitare aggiornamenti del DOM troppo frequenti
  setTimeout(() => {
    updateSelectedChordsDisplay(); // Solo dopo aver completato l'operazione di spostamento, aggiorna la UI
  }, 0);
}

// Logica tasto randomizzatore

document.addEventListener("DOMContentLoaded", function () {
  const shuffleButton = document.getElementById("shuffle-btn");
  
  shuffleButton.addEventListener("click", shuffleChords);
});

function ensureShuffleButton() {
  let shuffleButton = document.getElementById("shuffle-btn");

  if (!shuffleButton) {
    const bottomPanel = document.querySelector(".bottom-panel");
    
    // Rimuove eventuali slot extra indesiderati (solo se superano il limite di 9)
    while (bottomPanel.children.length > 9) {
      bottomPanel.removeChild(bottomPanel.lastChild);
    }

    // Crea il contenitore solo se il bottone non esiste già
    const shuffleSlot = document.createElement("div");
    shuffleSlot.classList.add("chord-slot");

    shuffleButton = document.createElement("button");
    shuffleButton.id = "shuffle-btn";
    shuffleButton.textContent = "⚡";
    shuffleButton.addEventListener("click", shuffleChords);

    shuffleSlot.appendChild(shuffleButton);
    bottomPanel.appendChild(shuffleSlot);
  }
}

function shuffleChords() {
  if (selectedChords.length > 1) {
    const shuffleButton = document.getElementById("shuffle-btn");

    // Aggiunge la classe per l'animazione
    shuffleButton.classList.add("shake");

    // Dopo 600ms rimuove la classe per poterla riapplicare in futuro
    setTimeout(() => {
      shuffleButton.classList.remove("shake");
    }, 600);

    // Ordina casualmente senza riassegnare l'array
    selectedChords.sort(() => Math.random() - 0.5);

    updateSelectedChordsDisplay(); // Aggiorna la UI con il nuovo ordine
  }
}

// Logica PlayChordsLoop e resetChordsLoop aggiornata

// 2.8.2 Riproduzione loop con evidenziazione dell'accordo attivo
function playChordsLoop() {
  if (selectedChords.length === 0) {
    alert("Seleziona almeno un accordo per avviare la riproduzione!");
    return;
  }

  currentInterval = calculateInterval(bpm, timeSignature); // Calcola l'intervallo in base al BPM e time signature

  let index = 0;
  currentInterval = setInterval(() => {
    // Rimuove l'illuminazione dal bottone dell'accordo precedente
    document.querySelectorAll(".chord-slot button").forEach(button => button.classList.remove("playing"));

    // Suona l'accordo e illumina il bottone corrispondente
    playChord(selectedChords[index]);
    const chordButtons = document.querySelectorAll(".chord-slot button");
    
    if (chordButtons[index]) {
      chordButtons[index].classList.add("playing");
    }

    index = (index + 1) % selectedChords.length; // Passa all'accordo successivo, resetta a 0 alla fine

  }, currentInterval);

  const stopButton = document.getElementById("stop-btn");
  if (stopButton) {
    stopButton.addEventListener("click", stopChordsLoop);
  }

  const resetButton = document.getElementById("reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", resetChordsLoop);
  }

  function stopChordsLoop() {
    if (currentInterval) {
      clearInterval(currentInterval);
      currentInterval = null;
      console.log("Loop fermato, ma gli accordi selezionati sono ancora attivi:", selectedChords);

      // Rimuove l'effetto di illuminazione
      document.querySelectorAll(".chord-slot button").forEach(button => button.classList.remove("playing"));
    }
  }

}

// 🔄 Funzione per resettare la sequenza di accordi
function resetChordsLoop() {
  if (currentInterval) {
      clearInterval(currentInterval);
      currentInterval = null;
  }

  selectedChords.length = 0; // Svuota l'array degli accordi selezionati
  console.log("Accordi deselezionati:", selectedChords);

  // ✅ Resetta solo i primi 8 slot e NON crea slot extra
  bottomPanelSlots.forEach((slot, index) => {
    if (index < 8) {
      slot.innerHTML = ""; // Svuota solo i primi 8 slot
    }
  });

  // ✅ Mantiene il pulsante shuffle visibile e separato
  ensureShuffleButton();

  console.log("Loop fermato, accordi deselezionati e pulsanti ripristinati.");
}

// 🛠 Associa la funzione resetChordsLoop al tasto reset appena lo script viene caricato
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("reset-btn");
  if (resetButton) {
      resetButton.addEventListener("click", resetChordsLoop);
  }
});
// Fine pullata Bande 31/01


// 2.7 Logica funzionamento tasto "Play"
const playButton = document.getElementById("play-btn");

if (playButton) {
  playButton.addEventListener("click", playChordsLoop);
} else {
  console.error("Pulsante Play non trovato. Assicurati che abbia l'ID 'play-btn'.");
}

// 2.8 Riproduzione, arresto e reset del loop di accordi
let currentInterval = null; // Variabile globale per gestire l'arresto del loop

// 2.8.1 Calcolo dell'intervallo in base alla time signature e ai BPM
function calculateInterval(bpm, timeSignature) {
  switch (timeSignature) {
    case '4/4':
      return (60000 / bpm) * 4; // Un accordo per battuta in 4/4
    case '3/4':
      return (60000 / bpm) * 3; // Un accordo per battuta in 3/4
    case '6/8':
      return (60000/(bpm/2)) * 2; // Due accordi per battuta in 6/8
      case '2/4':
        return (60000 / bpm) * 2; // Due battiti per battuta in 2/4
      case '5/4':
        return (60000 / bpm) * 5; // Cinque battiti per battuta in 5/4 (Take Five -  Dave Brubeck)
      case '7/4':
        return (60000 / bpm) * 7; // Sette battiti per battuta in 7/4 (Money - Pink Floyd)
    default:
      console.warn("Time signature non riconosciuta, impostazione predefinita su 4/4.");
      return (60000 / bpm) * 4;
  }
}


// 3. Assegnazione degli eventi ai pulsanti

// 3.1 Assegnazione delle scale proposte in base alla condizione meteo scelta
// 3.1 Assegnazione delle scale proposte in base alla condizione meteo scelta
const weatherButtons = {
  sunny: document.getElementById("sunny"),
  rainy: document.getElementById("rainy"),
  cloudy: document.getElementById("cloudy"),
  snowy: document.getElementById("snowy")
};

// Creazione dei dropdown all'inizio per ciascun bottone meteo
const weatherScales = {
  sunny: "major",
  rainy: "minor",
  cloudy: "sus4",
  snowy: "major7"
};

// Crea i dropdown per tutti i bottoni meteo all'inizio
Object.entries(weatherButtons).forEach(([weather, button]) => {
  createDropdown(weatherScales[weather], button); // Passa la scala corretta per ciascun bottone
});


// 3.2 Riproduzione dell'accordo selezionato tramite click
document.querySelectorAll('.chord-row').forEach(button => {

  button.addEventListener('click', (event) => {

    const chord = event.target.dataset.chord; // Contiene l'accordo (attributo data-chord) relativo all'elemento HTML cliccato

    if (chord) {
      playChord(chord);
    }
  });

});

// 3.3 Event listeners per BPM e Time-Signature
let bpm = 120; // Default BPM
let timeSignature = '4/4'; // Default Time Signature

function setBPM(value) {
  bpm = value;
}

function setTimeSignature(value) {
  timeSignature = value;
}

document.getElementById("bpm").addEventListener("input", (e) => {
  setBPM(e.target.value); // Imposta il nuovo BPM
});

document.getElementById("time-signature").addEventListener("change", (e) => {
  setTimeSignature(e.target.value); // Imposta la nuova Time-Signature
});


// 4 Logica per l'immagine di sfondo al click del weather button

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

function changeBackground2(weather) {
  let imageUrl;

  // 1. Imposta l'opacità a 0 per avviare la dissolvenza
  const backgroundContainer = document.getElementById('background-container');
  backgroundContainer.style.opacity = 0;

  // 2. Imposta un timeout per dare il tempo alla dissolvenza di terminare
  setTimeout(() => {
    // 3. Determina l'immagine da usare
    switch(weather) {
      default:
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sfondo.jpg';
        break;
      case 'sunnyy':
        imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sunny.jpg'; 
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

    // 4. Cambia l'immagine di sfondo
    backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
    backgroundContainer.style.backgroundSize = 'cover';
    backgroundContainer.style.backgroundPosition = 'center';
    backgroundContainer.style.backgroundRepeat = 'no-repeat';

    // 5. Ristabilisci l'opacità a 1 per rendere visibile il nuovo sfondo
    backgroundContainer.style.opacity = 1;
  }, 1000); // Il timeout corrisponde alla durata della transizione (1 secondo)
}




// 5 Logica relativa all'attivazione dei buttons, sia quella dei suoni caratteristici sia quella della scala scelta random

function highlightWeatherButton(condition) {
  // Rimuove la classe 'scaleactive' da tutti i pulsanti meteo
  document.querySelectorAll(".weather-btn").forEach(button => {
    button.classList.remove("scaleactive");
  });

  // Seleziona il pulsante corrispondente alla condizione meteo e aggiunge la classe 'scaleactive'
  const activeButton = document.querySelector(`.weather-btn.${condition}`);
  if (activeButton) {
    activeButton.classList.add("scaleactive");
  }
}

// Mappa dei suoni meteo
const weatherSounds = {
  sunny: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/birds.mp3'),
  rainy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/rain.mp3'),
  cloudy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/wind.mp3'),
  snowy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/snow.mp3')
};

let currentSound = null; // Variabile per tenere traccia del suono in riproduzione

// ANNA 01/02 ho pushato da qua modificando la funzione originale

// Funzione per riprodurre/fermare il suono
function playWeatherSound(weather) {
  let sound = weatherSounds[weather];
  if (!sound) {
    console.error("Suono non trovato per", weather);
    return;
  }

  // Ferma il suono precedente se diverso
  if (currentSound && currentSound !== sound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  // Avvia o ferma il suono attuale
  if (currentSound !== sound) {
    sound.loop = true;
    sound.currentTime = 0;
    sound.play();

    // Imposta il volume dal valore dello slider
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

// Mappa degli strumenti suggeriti per ciascun meteo
const weatherInstruments = {
  sunny: "*suggestion: Manor Grand",
  rainy: "*suggestion: Ganymede",
  cloudy: "*suggestion: Night Blade",
  snowy: "*suggestion: Soul Path"
};

// Funzione per mostrare il suggerimento dello strumento
function suggestInstrument(weather) {
  const suggestionContainer = document.getElementById("instrument-suggestion");
  if (!suggestionContainer) return;

  const suggestionText = weatherInstruments[weather];
  suggestionContainer.textContent = suggestionText ? suggestionText : "Strumento non disponibile per questa condizione meteo.";
}

// Funzione che resetta un weather button al click di un altro
function resetButtons(except) {
  Object.values(weatherButtons).forEach(button => {
    if (button !== except) button.classList.remove("soundactive");
  });
}

// Eventi sui bottoni meteo con tutte le funzionalità
Object.entries(weatherButtons).forEach(([weather, button]) => {
  button.addEventListener("click", () => {
    // Rimuove la classe 'scaleactive' da tutti i bottoni
    document.querySelectorAll(".weather-btn").forEach(btn => btn.classList.remove("scaleactive"));

    // Gestione stato bottone e reset degli altri
    const isActive = button.classList.contains("soundactive");
    resetButtons(button);
    button.classList.toggle("soundactive", !isActive);

    // Attivazione funzioni principali
    highlightWeatherButton(weather);
    playWeatherSound(weather);
    suggestInstrument(weather);
  });
});


document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("intro-screen").classList.add("hidden");
});
