// 1. Importazione script secondari

// 1.1 Acquisizione, mappatura e preload dei campioni audio
import { rhodes, epiano, indian } from './sounds.js';
console.log(rhodes, epiano, indian);

// 1.2 Definizione e mappatura di scale e accordi
import { scales, chords } from './scalesandchords.js';
console.log(scales, chords);


// 2. Funzioni e/o logica per la gestione dell'applicazione

// 2.1 Logica gestione cambio strumento
let currentNotes = rhodes; // Assegnazione dei dati (note .wav) contenuti in rhodes ad una variabile globale (strumento attivo di default)

document.getElementById('instruments').addEventListener('change', (event) => {

  const selectedInstrument = event.target.value; // Rappresenta il valore attuale dell'elemento HTML che ha generato l'evento (lo strumento selezionato)

  if (selectedInstrument === 'rhodes') {
    currentNotes = rhodes;

  } else if (selectedInstrument === 'epiano') {
    currentNotes = epiano;

  } else if (selectedInstrument === 'indian') {
    currentNotes = indian;
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

// 2.3 Creazione e aggiornamento del menù a tendina (scelta della scala)
function createDropdown(scaleType, weatherButton) {

  if (weatherButton.nextElementSibling && weatherButton.nextElementSibling.tagName === "SELECT") {
    return; // Verifica che il pulsante weatherButtons abbia già "SELECT" come elemento successivo (se la tendina è già stata creata non fa nulla)
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
    updateChordButtons(scaleType, scaleKeys[0]); // Imposta automaticamente la prima scala disponibile nell'array quando si preme su weatherButton la prima volta
  }

  dropdownContainer.addEventListener("change", () => {
    updateChordButtons(scaleType, dropdownContainer.value); // Cambia gli accordi proposti ogni volta che viene selezionata una nuova opzione dal menù a tendina
  });

  weatherButton.parentElement.insertBefore(dropdownContainer, weatherButton.nextSibling); // Aggiunge il menù a tendina creato al DOM (dopo il pulsante weatheButtons)
  
}

// 2.4 Aggiornamento degli accordi in relazione alla scala scelta
const chordButtonsContainer = document.querySelector(".chord-row");

function updateChordButtons(scaleType, rootNote) {

  const selectedScale = scales[scaleType][rootNote]; // ScaleType=major/minor/sus4/major7; rootNote=C,D,E..
  chordButtonsContainer.innerHTML = ""; // Svuota i tasti esistenti

  if (selectedScale) { // Verifica che la scala selezionata sia tra quelle definite

    selectedScale.forEach(note => {

      const button = document.createElement("button"); // Crea un elemento HTML button (pulsante)
      button.classList.add("chord-btn"); // Aggiunge una classe a tale pulsante 
      button.textContent = note;
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

  button.classList.toggle("active"); // Aggiunge/rimuove la classe "active" dal pulsante

  const selectedChord = button.dataset.chord; // Recupera il valore dell'attributo data-chord associato al pulsante (vedi updateChordButtons)
  const index = selectedChords.indexOf(selectedChord); // Cerca l'accordo selectedChord nell'array selectedChords (se è già presente restituisce il suo indice nell'array, altrimenti restituisce -1)

  if (index === -1) {
    selectedChords.push(selectedChord); // Aggiunge l'accordo selezionato all'array selectedChords

  } else {
    selectedChords.splice(index, 1); // Rimuove l'accordo selezionato (elemento nella posizione index) dall'array selectedCHords
  }

  updateSelectedChordsDisplay();

}

// 2.6 Aggiornamento visualizzazione degli accordi selezionati
const selectedChordsContainer = document.createElement("div"); // Contenitore per gli accordi selezionati
selectedChordsContainer.classList.add("selectedChordsContainer");

chordButtonsContainer.parentElement.appendChild(selectedChordsContainer); // Aggiunge l'elemento "selectedChordsContainer" come ultimo figlio dell'elemento genitore "chordButtonsContainer"

function updateSelectedChordsDisplay() {

  selectedChordsContainer.innerHTML = ""; // Svuota il contenitore degli accordi selezionati

  selectedChords.forEach(chord => {
    const chordBox = document.createElement("div");
    chordBox.textContent = chord;
    selectedChordsContainer.appendChild(chordBox);
  });

}

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
      return (60000 / (bpm/2)) * 2; // Due accordi per battuta in 6/8
    default:
      console.warn("Time signature non riconosciuta, impostazione predefinita su 4/4.");
      return (60000 / bpm) * 4;
  }
}

// 2.8.2 Riproduzione loop
function playChordsLoop() {

  if (selectedChords.length === 0) {
    alert("Seleziona almeno un accordo per avviare la riproduzione!");
    return;
  }

  currentInterval = calculateInterval(bpm, timeSignature); // Calcola l'intervallo in base alla time signature

  let index = 0;
  currentInterval = setInterval(() => { // Memorizza l'ID del timer nella variabile currentInterval
    playChord(selectedChords[index]); // Riproduce l'accordo corrispondente all'indice corrente
    index = (index + 1) % selectedChords.length; // Azzera l'indice quando arriva all'ultimo accordo della sequenza
  }, currentInterval); 

  const stopButton = document.getElementById("stop-btn");
  if (stopButton) {
    stopButton.addEventListener("click", stopChordsLoop); // Esegue la sottofunzione stopChordsLoop al premere del tasto stop
  } else {
    console.error("Pulsante Stop non trovato. Assicurati che abbia l'ID 'stop-btn'.");
  }

  const resetButton = document.getElementById("reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", resetChordsLoop); // Esegue la sottofunzione resetChordsLoop al premere del tasto reset
  } else {
    console.error("Pulsante Reset non trovato. Assicurati che abbia l'ID 'reset-btn'.");
  }

  // 2.8.2.1 Arresto senza deselezionare gli accordi
  function stopChordsLoop() {

    if (currentInterval) { // Verifica che currentInterval sia impostato
      clearInterval(currentInterval); // Ferma il timer
      currentInterval = null; // Resetta la variabile globale
      console.log("Loop fermato, ma gli accordi selezionati sono ancora attivi:", selectedChords);
    }
  }

  // 2.8.2.2 Arresto e ripristino alla configurazione di partenza
  function resetChordsLoop() {

    if (currentInterval) { 
      clearInterval(currentInterval); 
      currentInterval = null; 
    }

    selectedChords.length = 0; // Deselezione degli accordi (Svuota l'array contenente gli accordi selezionati)
    console.log("Accordi deselezionati:", selectedChords);

    selectedChordsContainer.innerHTML = ""; // Rimuove tutto il contenuto dal contenitore contenente gli accordi selezionati

    const chordButtons = document.querySelectorAll(".chord-btn");
    chordButtons.forEach(button => button.classList.remove("active")); // Ripristina tutti i pulsanti degli accordi allo stato iniziale rimuovendone la classe "active"

    console.log("Loop fermato, accordi deselezionati e pulsanti ripristinati.");

  }

}


// 3. Assegnazione degli eventi ai pulsanti

// 3.1 Assegnazione delle scale proposte in base alla condizione meteo scelta
const weatherButtons = {
  sunny: document.getElementById("sunny"),
  rainy: document.getElementById("rainy"),
  cloudy: document.getElementById("cloudy"),
  snowy: document.getElementById("snowy")
};

weatherButtons.sunny.addEventListener("click", () => {
  createDropdown("major", weatherButtons.sunny);
});

weatherButtons.rainy.addEventListener("click", () => {
  createDropdown("minor", weatherButtons.rainy);
});

weatherButtons.cloudy.addEventListener("click", () => {
  createDropdown("sus4", weatherButtons.cloudy);
});

weatherButtons.snowy.addEventListener("click", () => {
  createDropdown("major7", weatherButtons.snowy);
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


// Scegli l'immagine di sfondo in base alla condizione atmosferica
// LOLA 25/01
const images = {
  sunnyImage: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sunny.jpg',
  rainyImage: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/rainy.jpg',
  cloudyImage: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/cloudy.jpg',
  snowyImage: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/snowy.jpg',
  defaultImage: 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sfondo.jpg'
};

// Preload delle immagini per non avere delay
Object.values(images).forEach(imageUrl => {
  const img = new Image();
  img.src = imageUrl;
});

weatherButtons.sunny.addEventListener("click", () => {
  changeBackground("sunnyy", weatherButtons.sunny);
});

weatherButtons.rainy.addEventListener("click", () => {
  changeBackground("rainyy", weatherButtons.rainy);
});

weatherButtons.cloudy.addEventListener("click", () => {
  changeBackground("cloudyy", weatherButtons.cloudy);
});

weatherButtons.snowy.addEventListener("click", () => {
  changeBackground("snowyy", weatherButtons.snowy);
});


function changeBackground(weather) {
  let imageUrl;
  
  switch(weather) {
    default:
      imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sfondo.jpg';
    case 'sunnyy':
      imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/sunny.jpg'; 
      break;
    case 'rainyy':
      imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/rainy.jpg';
      break;
    case 'cloudyy':
      imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/cloudy.jpg'; 
      break;
    case 'snowyy':
      imageUrl = 'https://eleonorsrr.github.io/MeteotrAPP/assets/images/snowy.jpg'; 
      break;
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
}

// Suono di default corrispondente alle condizioni meteo
// ANNA 26/01

// Mappa dei bottoni meteo già dichiarata
// Mappa dei suoni meteo
const weatherSounds = {
  sunny: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/birds.mp3'),
  rainy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/rain.mp3'),
  cloudy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/wind.mp3'),
  snowy: new Audio('https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/snow.mp3')
};

// Preload dei suoni caratteristici
Object.values(weatherSounds).forEach(sound => {
  const snd = new Sound();
  img.src = sound;
});

  function playWeatherSound(weather) {
    let sound;
  
    switch (weather) {
      case 'sunnyy':
        sound = weatherSounds.sunny;
        break;
      case 'rainyy':
        sound = weatherSounds.rainy;
        break;
      case 'cloudyy':
        sound = weatherSounds.cloudy;
        break;
      case 'snowyy':
        sound = weatherSounds.snowy;
        break;
      default:
        console.error("Suono non trovato per", weather);
        sound = null;
    }
  
    if (sound) {
      console.log("Riproduzione suono:", sound.src);
      sound.loop = true;
      sound.currentTime = 0;  // Riparte dall'inizio
      sound.play();
    } else {
      console.log("Suono non disponibile");
    }
  }
  
  weatherButtons.sunny.addEventListener("click", () => {
    playWeatherSound("sunnyy");
  });
  
  weatherButtons.rainy.addEventListener("click", () => {
    playWeatherSound("rainyy");
  });
  
  weatherButtons.cloudy.addEventListener("click", () => {
    playWeatherSound("cloudyy");
  });
  
  weatherButtons.snowy.addEventListener("click", () => {
    playWeatherSound("snowyy");
  });




