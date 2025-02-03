// SCRIPT RELATIVO ALLA CREAZIONE, GESTIONE E RIPRODUZIONE DELLA SEQUENZA DI ACCORDI COMPOSTA DALL'UTENTE

// 1. Importazione script secondari

import { scales, chords } from './scalesandchords.js';
console.log(scales, chords);

import { getChordName } from "./chordmapping.js";
console.log(getChordName);

import { playChord } from "./script.js";


// 2. Funzioni per gestione della logica relativa agli accordi proposti e alla loro selezione (central/bottom-panel)

// 2.1 Aggiornamento degli accordi in relazione alla scala scelta
const chordButtonsContainer = document.querySelector(".chord-row");

export function updateChordButtons(scaleType, rootNote) {

    const selectedScale = scales[scaleType][rootNote]; 
    chordButtonsContainer.innerHTML = ""; 
  
    // Verifica che la scala selezionata sia tra quelle definite
    if (selectedScale) { 
  
      selectedScale.forEach(note => {
  
        // Creazione e definizione del pulsante relativo a un accordo
        const button = document.createElement("button"); 
        button.classList.add("chord-btn", "fixed-size"); 
        button.textContent = getChordName(note);
        button.dataset.chord = note; 
  
        // Selezione dell'accordo all'evento (click)
        button.addEventListener("click", () => {
          toggleChordSelection(button); 
        });
  
        // Aggiunta del pulsante appena creato al contenitore dei pulsanti degli accordi
        chordButtonsContainer.appendChild(button); 
  
      });
  
    } else {
      console.error("Scala non trovata per", scaleType, rootNote);
    }
  
  }

// 2.2 Selezione/Deselezione di un accordo
const selectedChords = [];

function toggleChordSelection(button) {

  const selectedChord = button.dataset.chord; 
  
  // Aggiunta dell'accordo selezionato all'array
  selectedChords.push(selectedChord); 

  updateSelectedChordsDisplay();
}

// 2.3 Aggiornamento visualizzazione degli accordi selezionati
const bottomPanelSlots = document.querySelectorAll(".bottom-panel .chord-slot");
const MAX_CHORDS = bottomPanelSlots.length - 1; 

function updateSelectedChordsDisplay() {

  // Rimozione di eventuali accordi in eccesso
  while (selectedChords.length > MAX_CHORDS) {
    selectedChords.pop(); 
  }

  selectedChords.forEach((chord, index) => {

    if (index < MAX_CHORDS) { 

      const slot = bottomPanelSlots[index];
      let chordButton = slot.querySelector("button");

      // Creazione del bottone nel caso in cui non esista
      if (!chordButton) {
        
        chordButton = document.createElement("button");
        chordButton.classList.add("chord-btn");
        slot.appendChild(chordButton);

        // Rimozione di un accordo all'evento (click)
        chordButton.addEventListener("click", () => removeChordFromSequence(index));

      }

      // Aggiornamento del contenuto del bottone
      chordButton.textContent = getChordName(chord);
      chordButton.dataset.chord = chord;

    }

  });

  // Rimozione di eventuali accordi in eccesso dagli slot
  for (let i = selectedChords.length; i < MAX_CHORDS; i++) {
    bottomPanelSlots[i].innerHTML = "";
  }
  
  // Garanzia della visibilità del bottone shuffle
  ensureShuffleButton(); 

  // Abilitazione funzionalità drag & drop per gli ementi selezionati
  enableDragAndDrop(); 

}

// 2.4 Rimozione dell'accordo selezionato
function removeChordFromSequence(index) {

  selectedChords.splice(index, 1); 
  updateSelectedChordsDisplay(); 

}


// 3. Funzioni per gestione della logica drag & drop per gli accordi selezionati (bottom-panel)

// 3.1 Gestione logica drag & drop
let draggedElement = null;
let draggedIndex = null;

function enableDragAndDrop() {

  const chordSlots = document.querySelectorAll(".bottom-panel .chord-slot");

  chordSlots.forEach((slot, index) => {

    const button = slot.querySelector("button");

    if (!button) return; 

    button.setAttribute("draggable", true);

    // Rimozione dei listener precedenti prima di aggiungerli (evita duplicazioni)
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

// 3.2 Avvio trascinamento
function dragStartHandler(event) {

  draggedElement = event.target; 
  draggedIndex = [...document.querySelectorAll(".bottom-panel .chord-slot button")].indexOf(draggedElement);
  event.dataTransfer.effectAllowed = "move";

  setTimeout(() => {
    draggedElement.style.opacity = "0.5";
  }, 0);

}

// 3.3 Gestione trascinamento
function dragOverHandler(event) {

  event.preventDefault();
  event.target.classList.add("drag-over");

}

// 3.4 Gestione rilascio
function dropHandler(event) {

  event.preventDefault();
  event.target.classList.remove("drag-over");

  // Recupero indice corretto dell'elemento target
  const chordButtons = [...document.querySelectorAll(".bottom-panel .chord-slot button")];
  const targetIndex = chordButtons.indexOf(event.target);

  if (draggedIndex !== targetIndex && targetIndex !== -1) {
    swapChords(draggedIndex, targetIndex);
  }

}

// 3.5 Conclusione rilascio
function dragEndHandler() {

  if (draggedElement) {
    draggedElement.style.opacity = "1";
  }

  draggedElement = null;
  draggedIndex = null;

}

// 3.6 Spostamento accordo selezionato e conseguente ridisposizione dei restanti
function swapChords(fromIndex, toIndex) {

  if (fromIndex === toIndex) return; 

  let movedChord = selectedChords[fromIndex]; 

  // Spostamento dell'elemento da `fromIndex` a `toIndex`
  selectedChords.splice(fromIndex, 1); 
  selectedChords.splice(toIndex, 0, movedChord);

  // Ottimizzazione per evitare aggiornamenti del DOM troppo frequenti
  setTimeout(() => {
    updateSelectedChordsDisplay(); 
  }, 0);

}


// 4. Funzioni per gestione della logica del tasto randomizzatore

// 4.1 Assegnazione della logica all'evento (click)
document.addEventListener("DOMContentLoaded", function () {

  const shuffleButton = document.getElementById("shuffle-btn");
    
  shuffleButton.addEventListener("click", shuffleChords);
  
});
  
// 4.2 Rimescolamento accordi e animazione pulsante
function shuffleChords() {

  if (selectedChords.length > 1) {

    const shuffleButton = document.getElementById("shuffle-btn");

    shuffleButton.classList.add("shake");

    // Rimozione della classe aggiunta (per poterla riapplicare in futuro)
    setTimeout(() => {
      shuffleButton.classList.remove("shake");
    }, 600);

    // Ordinamento casualmente dell'array
    selectedChords.sort(() => Math.random() - 0.5);

    updateSelectedChordsDisplay();

  }

}

// 4.3 Controllo esistenza del tasto randomizzatore
function ensureShuffleButton() {

  let shuffleButton = document.getElementById("shuffle-btn");

  if (!shuffleButton) {

    const bottomPanel = document.querySelector(".bottom-panel");

    // Rimozione eventuali slot extra indesiderati (solo se superano il limite di 9)
    while (bottomPanel.children.length > 9) {
      bottomPanel.removeChild(bottomPanel.lastChild);
    }

    // Creazione tasto randomizzatore se non esiste già
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
  
  
// 5. Funzioni per gestione della logica di avvio/arresto/reset della sequenza di accordi 

// 5.1 Definizione delle variabili globali (BPM & time signature)
let bpm = 120;
let timeSignature = '4/4'; 
  
// 5.2 Aggiornamento delle variabili globali
function setBPM(value) {
  bpm = value;
}
  
function setTimeSignature(value) {
  timeSignature = value;
}

// 5.2 Calcolo dell'intervallo in relazione a BPM & time signature
function calculateInterval(bpm, timeSignature) {

  switch (timeSignature) {

    case '4/4':
      return (60000 / bpm) * 4;
    case '3/4':
      return (60000 / bpm) * 3;
    case '6/8':
      return (60000 / (bpm / 2)) * 2;
    case '2/4':
      return (60000 / bpm) * 2;
    case '5/4':
      return (60000 / bpm) * 5;
    case '7/4':
      return (60000 / bpm) * 7;

    default:
      console.warn("Time signature non riconosciuta, impostazione predefinita su 4/4.");
      return (60000 / bpm) * 4;

  }

}  

// 5.3 Riproduzione della sequenza di accordi selezionati
let currentInterval = null;

function playChordsLoop() {

  if (selectedChords.length === 0) {
    alert("Seleziona almeno un accordo per avviare la riproduzione!");
    return;
  }

  // Previene la sovrapposizione di loop
  if (currentInterval !== null) {
    return;
  }

  // Aggiornamento dinamico di BPM e time signature
  updateLoop();

  // Disabilitazione del pulsante play per evitare la sovrapposizione tra più sequenze
  document.getElementById("play-btn").disabled = true;

}
  
// 5.4 Aggiornamento dinamico del loop al variare di BPM e time signature
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
  
// 5.5 Arresto riproduzione della sequenza
function stopChordsLoop() {

  if (currentInterval !== null) {

    clearInterval(currentInterval);

    currentInterval = null;

    document.querySelectorAll(".chord-slot button").forEach(button => button.classList.remove("playing"));

    document.getElementById("play-btn").disabled = false; 

  }

}

// 5.8 Reset della sequenza
function resetChordsLoop() {

  if (currentInterval) {

      clearInterval(currentInterval);
      currentInterval = null;

  }

  // Svuotamento array contenente gli accordi selezionati
  selectedChords.length = 0; 

  // Svuotamento degli 8 slot per gli accordi
  bottomPanelSlots.forEach((slot, index) => {

    if (index < 8) {
      slot.innerHTML = ""; 
    }

  });

  ensureShuffleButton();

  document.getElementById("play-btn").disabled = false;

  console.log("Loop fermato, accordi deselezionati e pulsanti ripristinati.");

}


// 6. Gestione EventListeners

// 6.1 Pulsanti Play/Stop/Reset (per avvio/stop/reset della sequenza)
document.getElementById("play-btn").addEventListener("click", playChordsLoop);
document.getElementById("stop-btn").addEventListener("click", stopChordsLoop);
document.getElementById("reset-btn").addEventListener("click", resetChordsLoop);
  

// 6.2 BPM & time signature (per aggiornamento dinamico della sequenza)
document.getElementById("bpm").addEventListener("input", (e) => {

  setBPM(e.target.value);
  if (currentInterval !== null) updateLoop();

});
  
document.getElementById("time-signature").addEventListener("change", (e) => {
  
  setTimeSignature(e.target.value);
  if (currentInterval !== null) updateLoop();

});
  
  
  
  
