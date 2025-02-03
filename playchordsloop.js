import { scales, chords } from './scalesandchords.js';
console.log(scales, chords);

import { getChordName } from "./chordmapping.js";
console.log(getChordName);

import { playChord } from "./script.js";

// 2.4 Aggiornamento degli accordi in relazione alla scala scelta
const chordButtonsContainer = document.querySelector(".chord-row");

export function updateChordButtons(scaleType, rootNote) {

    const selectedScale = scales[scaleType][rootNote]; // ScaleType=major/minor/sus4/major7; rootNote=C,D,E..
    chordButtonsContainer.innerHTML = ""; // Svuota i tasti esistenti
  
    if (selectedScale) { // Verifica che la scala selezionata sia tra quelle definite
  
      selectedScale.forEach(note => {
  
        const button = document.createElement("button"); // Crea un elemento HTML button (pulsante)
        button.classList.add("chord-btn", "fixed-size"); // Aggiunge una classe a tale pulsante 
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
const MAX_CHORDS = bottomPanelSlots.length - 1; // Numero massimo di accordi selezionabili

function updateSelectedChordsDisplay() {
  while (selectedChords.length > MAX_CHORDS) {
    selectedChords.pop(); // Rimuove eventuali accordi in eccesso
  }

  selectedChords.forEach((chord, index) => {
    if (index < MAX_CHORDS) { // Evita di superare il numero massimo di slot
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

  // Rimuove eventuali accordi in eccesso dagli slot
  for (let i = selectedChords.length; i < MAX_CHORDS; i++) {
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

// 2.8.2 Riproduzione loop con aggiornamento dinamico di BPM e time signature
function playChordsLoop() {
    if (selectedChords.length === 0) {
      alert("Seleziona almeno un accordo per avviare la riproduzione!");
      return;
    }
  
    if (currentInterval !== null) {
      return; // Previene la sovrapposizione di loop
    }
  
    updateLoop(); // Avvia la riproduzione con BPM e time signature attuali
    document.getElementById("play-btn").disabled = true; // Disabilita il play per evitare più cicli paralleli
  }
  
  // Funzione per aggiornare dinamicamente il loop con i nuovi valori di BPM e time signature
  function updateLoop() {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
    }
  
    currentInterval = calculateInterval(bpm, timeSignature);
    let index = 0;
  
    currentInterval = setInterval(() => {
      document.querySelectorAll(".chord-slot button").forEach(button => button.classList.remove("playing"));
  
      playChord(selectedChords[index]);
      const chordButtons = document.querySelectorAll(".chord-slot button");
      if (chordButtons[index]) {
        chordButtons[index].classList.add("playing");
      }
  
      index = (index + 1) % selectedChords.length;
  
    }, currentInterval);
  }
  
  // 2.8.3 Stop della riproduzione senza cancellare gli accordi
  function stopChordsLoop() {
    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
      document.querySelectorAll(".chord-slot button").forEach(button => button.classList.remove("playing"));
      document.getElementById("play-btn").disabled = false; // Riabilita il tasto play
    }
  }
  
  // 3.3.1 Aggiornamento automatico del loop quando cambiano BPM o time signature
  document.getElementById("bpm").addEventListener("input", (e) => {
    setBPM(e.target.value);
    if (currentInterval !== null) updateLoop();
  });
  
  document.getElementById("time-signature").addEventListener("change", (e) => {
    setTimeSignature(e.target.value);
    if (currentInterval !== null) updateLoop();
  });
  
  // Associa i pulsanti
  document.getElementById("play-btn").addEventListener("click", playChordsLoop);
  document.getElementById("stop-btn").addEventListener("click", stopChordsLoop);
  
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
    document.getElementById("play-btn").disabled = false; // Riabilita il tasto play
  
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

  

  
  // 3.3 Event listeners per BPM e Time-Signature
  let bpm = 120; // Default BPM
  let timeSignature = '4/4'; // Default Time Signature
  
  function setBPM(value) {
    bpm = value;
  }
  
  function setTimeSignature(value) {
    timeSignature = value;
  }
  