// Definizione scala cromatica 3 ottave
const chromaticScale = [
  "C", "Csharp", "D", "Dsharp", "E", "F", "Fsharp", "G", "Gsharp", "A", "Asharp", "B",  
  "C2", "C2sharp", "D2", "D2sharp", "E2", "F2", "F2sharp", "G2", "G2sharp", "A2", "A2sharp", "B2", 
  "C3", "C3sharp", "D3", "D3sharp", "E3", "F3", "F3sharp", "G3", "G3sharp", "A3", "A3sharp", "B3",  
  "C4"  
];


const majorScalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26, 28, 29, 31, 33, 35];  // Scala maggiore
const minorScalePattern = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26, 27, 29, 31, 32, 34];  // Scala minore naturale

     

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
    
    //Logica inversioni in base a grado accordo
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
  const notes = ["C", "D", "E", "F", "G", "A", "B"];  

  // Itera attraverso i tipi di scala (major, minor, sus4, major7)
  scaleTypes.forEach(scaleType => {
    notes.forEach(note => {
      // Per ogni nota della scala, prendi gli accordi corrispondenti
      scales[scaleType][note].forEach((chordArray) => {
        
        let chordName;
        
        
        if (Array.isArray(chordArray)) {
          chordName = chordArray.join("");  
        } else {
          chordName = chordArray; 
        }
        
        // Aggiungi l'accordo a chords se non esiste già
        if (!chords[chordName]) {
          chords[chordName] = chordArray; 
        }

        // Aggiungi il nome dell'accordo alla lista di scales (al posto dell'array di note)
        scales[scaleType][note] = scales[scaleType][note].map(chord => {
          // Se 'chord' è un array, mappiamo al suo nome
          return Array.isArray(chord) ? chord.join("") : chord;
        });
      });
    });
  });

  console.log("Chords:", chords);  
  console.log("Scales:", scales);  
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
  populateChordsAndUpdateScales();  
}

// Esegui la funzione per generare le strutture
generateScales();

// Esportazione di scale e accordi
export { scales, chords };
