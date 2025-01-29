// Vettore con la scala cromatica di due ottave (C1 - C3)
const chromaticScale = [
  "C", "Csharp", "D", "Dsharp", "E", "F", "Fsharp", "G", "Gsharp", "A", "Asharp", "B",
  "C2", "C2sharp", "D2", "D2sharp", "E2", "F2", "F2sharp", "G2", "G2sharp", "A2", "A2sharp", "B2",
  "C3"
];


// Intervalli della scala maggiore e minore naturale
const majorScalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];  // Scala maggiore
const minorScalePattern = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22];  // Scala minore naturale
     

// Funzione per ottenere una scala a partire da una nota
function getScale(rootNote, scalePattern) {
  const rootIndex = chromaticScale.indexOf(rootNote);
  if (rootIndex === -1) {
    throw new Error("Nota di partenza non valida");
  }

  return scalePattern.map(interval => chromaticScale[(rootIndex + interval) % chromaticScale.length]);  
}

// Funzione per ottenere gli accordi della scala
function getAccordsForScale(rootNote, scalePattern, chordType) {
  const scale = getScale(rootNote, scalePattern);

  // Funzioni per costruire accordi
  const getTriad = (index) => [scale[index], scale[index + 2], scale[index + 4]];
  const getSusChord = (index) => [scale[index], scale[index + 3], scale[index + 4]];
  const getSeventhChord = (index) => [scale[index], scale[index + 2], scale[index + 4], scale[index + 6]];

  // Generiamo solo i primi 7 gradi
  const accords = [];
  for (let index = 0; index < 7; index++) {
    let chord;

    if (chordType === 'triad') {
      if (index === 3 || index === 4) {
        chord = getTriad(index).map((note, i) => (i === 2 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else if (index === 5 || index === 6) {
        chord = getTriad(index).map((note, i) => (i === 1 || i === 2 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else {
        chord = getTriad(index);
      }
    } else if (chordType === 'sus') {
      if (index === 3 || index === 4) {
        chord = getSusChord(index).map((note, i) => (i === 2 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else if (index === 5 || index === 6) {
        chord = getSusChord(index).map((note, i) => (i === 1 || i === 2 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else {
        chord = getSusChord(index);
      }
    } else if (chordType === 'seventh') {
      if (index === 3 || index === 4) {
        chord = getSeventhChord(index).map((note, i) => (i === 3 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else if (index === 5 || index === 6) {
        chord = getSeventhChord(index).map((note, i) => (i === 2 || i === 3 ? chromaticScale[chromaticScale.indexOf(note) - 12] : note));
      } else {
        chord = getSeventhChord(index);
      }
    }
    
    accords.push(chord);
  }

  return accords;
}


// Strutture finali per scales e chords
const scales = {
  major: {},
  minor: {},
  sus4: {},
  major7: {}
};

const chords = {};

// Funzione per estrarre gli accordi da scales e popolare chords e scales con i nomi degli accordi
function populateChordsAndUpdateScales() {
  const scaleTypes = ["major", "minor", "sus4", "major7"];  // Tipi di scale
  const notes = ["C", "D", "E", "F", "G", "A", "B"];  // Le note da C a B

  // Itera attraverso i tipi di scala (major, minor, sus4, major7)
  scaleTypes.forEach(scaleType => {
    notes.forEach(note => {
      // Per ogni nota della scala, prendi gli accordi corrispondenti
      scales[scaleType][note].forEach((chordArray) => {
        // Creiamo un nome per l'accordo (es. "C", "Dm", "Em" ecc.)
        let chordName;
        
        // Se 'chordArray' è un array, allora uniscilo in una stringa
        if (Array.isArray(chordArray)) {
          chordName = chordArray.join("");  // E.g. "C", "Dm", "Em" etc.
        } else {
          chordName = chordArray; // Se non è un array, prendiamo direttamente il nome
        }
        
        // Aggiungi l'accordo a chords se non esiste già
        if (!chords[chordName]) {
          chords[chordName] = chordArray;  // Assegna l'array di note all'accordo
        }

        // Aggiungi il nome dell'accordo alla lista di scales (al posto dell'array di note)
        scales[scaleType][note] = scales[scaleType][note].map(chord => {
          // Se 'chord' è un array, mappiamo al suo nome
          return Array.isArray(chord) ? chord.join("") : chord;
        });
      });
    });
  });

  console.log("Chords:", chords);  // Mostra la struttura finale
  console.log("Scales:", scales);  // Mostra la struttura aggiornata di scales
}

// Funzione per generare scales e chords per tutte le note
function generateScales() {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  
  notes.forEach(note => {
    // Per ogni nota, generiamo le scale (maggiore, minore, sus4, major7)
    scales.major[note] = getAccordsForScale(note, majorScalePattern, "triad");
    scales.minor[note] = getAccordsForScale(note, minorScalePattern, "triad");
    scales.sus4[note] = getAccordsForScale(note, majorScalePattern, "sus");
    scales.major7[note] = getAccordsForScale(note, majorScalePattern, "seventh");
    
  });

  console.log("Scales:", scales);
  populateChordsAndUpdateScales();  // Popola chords e aggiorna scales con i nomi degli accordi
}

// Esegui la funzione per generare le strutture
generateScales();

// 1.3 Esportazione di scale e accordi
export { scales, chords };
