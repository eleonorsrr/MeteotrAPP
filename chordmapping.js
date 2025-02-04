// Funzione che mappa ogni combinazione di note al nome dell'accordo
const chordNameMapping = {
  // 1. Major Scales
  "CEG": "C", // C
  "DFA": "Dm", 
  "EGB": "Em", 
  "FAC": "F", 
  "GBD": "G", 
  "ACE": "Am", 
  "BDF": "Bdim", 

  "DFsharpA": "D", //D
  "FsharpAC2sharp": "F#m", 
  "AC2sharpE": "A", 
  "BDFsharp": "Bm", 
  "C2sharpEG": "C#dim", 

  "EGsharpB": "E", // E
  "GsharpBD2sharp": "G#m", 
  "BD2sharpFsharp": "B", 
  "C2sharpEGsharp": "C#m", 
  "D2sharpFsharpA": "D#dim", 

  "FAC2": "F", // F
  "GAsharpD2": "Gm", 
  "AC2E2": "Am", 
  "AsharpD2F": "Bd", 
  "C2E2G": "C", 
  "D2FA": "Dm", 
  "E2GAsharp": "Edim",

  "GBD2": "G", // G
  "BD2F2sharp": "Bm", 
  "D2F2sharpA": "D", 
  "E2GB": "Em", 
  "F2sharpAC2": "F#dim", 

  "AC2sharpE2": "A", // A
  "C2sharpE2G2sharp": "C#m", 
  "E2G2sharpB": "E", 
  "F2sharpAC2sharp": "F#m",
  "G2sharpBD2": "G#dim",

  "BD2sharpF2sharp": "B", // B
  "D2sharpF2sharpA2sharp": "D#m", 
  "F2sharpA2sharpC2sharp": "F#", 
  "G2sharpBD2sharp": "G#m",
  "A2sharpC2sharpE2": "A#dim",
  

  // 2. Minor Scales
  "CDsharpG": "Cm", // C
  "DFGsharp": "Ddim", 
  "DsharpGAsharp": "Eb", 
  "FGsharpC": "Fm", 
  "GAsharpD": "Gm", 
  "GsharpCDsharp": "Ab", 
  "AsharpDF": "Bb", 

  "EGAsharp": "Edim", // D
  "AC2E": "Am", 
  "C2EG": "C", 

  "FsharpAC2": "F#dim", // E
  "BD2Fsharp": "Bm", 
  "D2FsharpA": "D", 

  "FGsharpC2": "Fm", // F
  "GAsharpC2sharp": "Gdim", 
  "GsharpC2D2sharp": "Ab", 
  "AsharpC2sharpF": "Bbm", 
  "C2D2sharpG": "Cm", 
  "C2sharpFGsharp": "Db", 
  "D2sharpGAsharp": "Eb",

  "AC2D2sharp": "Adim", // G
  "AsharpD2F2": "Bb", 
  "D2F2A": "Dm", 
  "F2AC2": "F", 

  "BD2F2": "Bdim", // A
  "C2E2G2": "C", 
  "E2G2B": "Em", 
  "G2BD2": "G", 

  "C2sharpE2G2": "C#dim", // B
  "D2F2sharpA2": "D", 
  "F2sharpA2C2sharp": "F#m", 
  "A2C2sharpE2": "A",


  // 3. Sus4 Scales
  "CFG": "Csus4", // C
  "DGA": "Dsus4", 
  "EAB": "Esus4", 
  "FBC": "Fsus4*", 
  "GC2D": "Gsus4", 
  "ADE": "Asus4", 
  "BEF": "Bsus4*", 


  "FsharpBC2sharp": "F#sus4", // D
  "GC2sharpD": "Gsus4*", 
  "AD2E": "Asus4", 
  "BEFsharp": "Bsus4*", 
  "C2sharpFsharpG": "C#sus4*", 

  "GsharpC2sharpD2sharp": "G#sus4", // E
  "AD2sharpE": "Asus4*", 
  "BE2Fsharp": "Bsus4*", 
  "C2sharpFsharpGsharp": "C#sus4", 
  "D2sharpGsharpA": "D#sus4*", 

  "FAsharpC2": "Fsus4*", // F
  "GC2D2": "Gsus4", 
  "AD2E2": "Asus4", 
  "AsharpE2F": "A#sus4*", 
  "C2F2G": "Csus4", 
  "D2GA": "Dsus4", 
  "E2AAsharp": "Esus4*", 

  "BE2F2sharp": "Bsus4", // G
  "C2F2sharpG": "Csus4*", 
  "D2G2A": "Dsus4",
  "E2AB": "Esus4",
  "F2sharpBC2": "F#sus4", 

  "C2sharpF2sharpG2sharp": "C#sus4", // A
  "D2G2sharpA": "Dsus4*",
  "E2A2B": "Esus4", 
  "F2sharpBC2sharp": "F#sus4",
  "G2sharpC2sharpD2": "G#sus4*",

  "D2sharpG2sharpA2sharp": "D#sus4", // B
  "E2A2sharpB": "Esus4*",
  "F2sharpB2C2sharp": "F#sus4",
  "G2sharpC2sharpD2sharp": "G#sus4",
  "A2sharpD2sharpE2": "A#sus4",


  // 4. Major7 Scales
  "CEGB": "Cmaj7", // C
  "DFAC2": "Dm7",
  "EGBD2": "Em7",
  "FAC2E": "Fmaj7", 
  "GBD2F": "G7", 
  "AC2EG": "Am7",
  "BD2FA": "Bm7b5", 

  "DFsharpAC2sharp": "Dmaj7", // D
  "FsharpAC2sharpE2": "F#m7",
  "GBD2Fsharp": "Gmaj7", 
  "AC2sharpE2G": "A7", 
  "BD2FsharpA": "Bm7",
  "C2sharpE2GB": "C#m7b5",

  "EGsharpBD2sharp": "Emaj7", // E
  "GsharpBD2sharpF2sharp": "G#m7",
  "AC2sharpE2Gsharp": "Amaj7", 
  "BD2sharpF2sharpA": "B7", 
  "C2sharpE2GsharpB": "C#m7",
  "D2sharpF2sharpAC2sharp": "D#m7b5",

  "FAC2E2": "Fmaj7", // F
  "GAsharpD2F2": "Gm7", 
  "AC2E2G2": "Am7",
  "AsharpD2F2A": "Bmaj7", 
  "C2E2G2Asharp": "C7", 
  "D2F2AC2": "Bm7",
  "E2G2AsharpD2": "Em7b5",

  "GBD2F2sharp": "Gmaj7", // G
  "BD2F2sharpA2": "Bm7",
  "C2E2G2B": "Cmaj7", 
  "D2F2sharpA2C2": "D7", 
  "E2G2BD2": "Em7",
  "F2sharpA2C2E2": "F#m7b5",

  "AC2sharpE2G2sharp": "Amaj7", // A
  "C2sharpE2G2sharpB2": "C#m7",
  "D2F2sharpA2C2sharp": "Dmaj7",
  "E2G2sharpB2D2": "E7",
  "F2sharpA2C2sharpE2": "F#m7",
  "G2sharpB2D2F2sharp": "G#m7b5",

  "BD2sharpF2sharpA2sharp": "Bmaj7", // B
  "D2sharpF2sharpA2sharpC3sharp": "D#m7",
  "E2G2sharpB2D2sharp": "Emaj7",
  "F2sharpA2sharpC3sharpE2": "F#7",
  "G2sharpB2D2sharpF2sharp": "G#m7",
  "A2sharpC3sharpE2G2sharp": "A#m7b5",
};

function getChordName(notes) {

  return chordNameMapping[notes] || notes;
}

export { getChordName };
