// 1. Definizione e mappatura di scale e accordi

// 1.1 Scale
const scales = {
    major: {
      "C": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
      "D": ["D", "Em", "Fsharpm", "G", "A", "Bm", "Csharpdim"],
      "E": ["E", "Fsharpm", "Gsharpm", "A", "B", "Csharpm", "Dsharpdim"],
      "F": ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
      "G": ["G", "Am", "Bm", "C", "D", "Em", "Fsharpdim"],
      "A": ["A", "Bm", "Csharpm", "D", "E", "Fsharpm", "Gsharpdim"],
      "B": ["B", "Csharpm", "Dsharpm", "E", "Fsharp", "Gsharpm", "Asharpdim"]
    },
  
    minor: {
      "Cm": ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
      "Dm": ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
      "Em": ["Em", "Fsharpdim", "G", "Am", "Bm", "C", "D"],
      "Fm": ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
      "Gm": ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
      "Am": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
      "Bm": ["Bm", "Csharpdim", "D", "Em", "Fsharpm", "G", "A"]
    },
  
    sus4: {
      "C": ["Csus4", "Dsus4", "Esus4", "Fsus4", "Gsus4", "Asus4", "Bsus4"],
      "D": ["Dsus4", "Esus4", "Fsharpsus4", "Gsus4", "Asus4", "Bsus4", "Csharpsus4"],
      "E": ["Esus4", "Fsharpsus4", "Gsharpsus4", "Asus4", "Bsus4", "Csharpsus4", "Dsharpsus4"],
      "F": ["Fsus4", "Gsus4", "Asus4", "Bbsus4", "Csus4", "Dsus4", "Esus4"],
      "G": ["Gsus4", "Asus4", "Bsus4", "Csus4", "Dsus4", "Esus4", "Fsharpsus4"],
      "A": ["Asus4", "Bsus4", "Csharpsus4", "Dsus4", "Esus4", "Fsharpsus4", "Gsharpsus4"],
      "B": ["Bsus4", "Csharpsus4", "Dsharpsus4", "Esus4", "Fsharpsus4", "Gsharpsus4", "Asharpsus4"]
    },
  
    major7: {
      "Cmaj7": ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bm7b5"],
      "Dmaj7": ["Dmaj7", "Em7", "Fsharpm7", "Gmaj7", "A7", "Bm7", "Csharpm7b5"],
      "Emaj7": ["Emaj7", "Fsharpm7", "Gsharpm7", "Amaj7", "B7", "Csharpm7", "Dsharpm7b5"],
      "Fmaj7": ["Fmaj7", "Gm7", "Am7", "Bbmaj7", "C7", "Dm7", "Em7b5"],
      "Gmaj7": ["Gmaj7", "Am7", "Bm7", "Cmaj7", "D7", "Em7", "Fsharpm7b5"],
      "Amaj7": ["Amaj7", "Bm7", "Csharpm7", "Dmaj7", "E7", "Fsharpm7", "Gsharpm7b5"],
      "Bmaj7": ["Bmaj7", "Csharpm7", "Dsharpm7", "Emaj7", "Fsharpm7", "Gsharpm7", "Asharpm7b5"]
    }
  };
  
  // 1.2 Accordi
  const chords = {
    C: ['C', 'E', 'G'],
    Cm: ['C', 'Dsharp', 'G'],
    Cmaj7: ['C', 'E', 'G', 'B'],
    Csus4: ['C', 'F', 'G'],
    Cdim: ['C', 'Dsharp', 'Fsharp'],
    C7: ['C', 'E', 'G', 'Asharp'],
    Cm7: ['C', 'Dsharp', 'G', 'Asharp'],
    Cm7b5: ['C', 'Dsharp', 'Fsharp', 'Asharp'],
  
    D: ['D', 'Fsharp', 'A'],
    Dm: ['D', 'F', 'A'],
    Dmaj7: ['D', 'Fsharp', 'A', 'Csharp'],
    Dsus4: ['D', 'G', 'A'],
    Ddim: ['D', 'F', 'Gsharp'],
    D7: ['D', 'Fsharp', 'A', 'C'],
    Dm7: ['D', 'F', 'A', 'C'],
    Dm7b5: ['D', 'F', 'Gsharp', 'C'],
  
    E: ['E', 'Gsharp', 'B'],
    Em: ['E', 'G', 'B'],
    Emaj7: ['E', 'Gsharp', 'B', 'Dsharp'],
    Esus4: ['E', 'A', 'B'],
    Edim: ['E', 'G', 'Asharp'],
    E7: ['E', 'Gsharp', 'B', 'D'],
    Em7: ['E', 'G', 'B', 'D'],
    Em7b5: ['E', 'G', 'Asharp', 'D'],
  
    F: ['F', 'A', 'C'],
    Fm: ['F', 'Gsharp', 'C'],
    Fmaj7: ['F', 'A', 'C', 'E'],
    Fsus4: ['F', 'Asharp', 'C'],
    Fdim: ['F', 'Gsharp', 'B'],
    F7: ['F', 'A', 'C', 'Dsharp'],
    Fm7: ['F', 'Gsharp', 'C', 'Dsharp'],
    Fm7b5: ['F', 'Gsharp', 'B', 'Dsharp'],
  
    G: ['G', 'B', 'D'],
    Gm: ['G', 'Asharp', 'D'],
    Gmaj7: ['G', 'B', 'D', 'Fsharp'],
    Gsus4: ['G', 'C', 'D'],
    Gdim: ['G', 'Asharp', 'Csharp'],
    G7: ['G', 'B', 'D', 'F'],
    Gm7: ['G', 'Asharp', 'D', 'F'],
    Gm7b5: ['G', 'Asharp', 'Csharp', 'F'],
  
    A: ['A', 'Csharp', 'E'],
    Am: ['A', 'C', 'E'],
    Amaj7: ['A', 'Csharp', 'E', 'Gsharp'],
    Asus4: ['A', 'D', 'E'],
    Adim: ['A', 'C', 'Dsharp'],
    A7: ['A', 'Csharp', 'E', 'G'],
    Am7: ['A', 'C', 'E', 'G'],
    Am7b5: ['A', 'C', 'Dsharp', 'G'],
  
    B: ['B', 'Dsharp', 'Fsharp'],
    Bm: ['B', 'D', 'Fsharp'],
    Bmaj7: ['B', 'Dsharp', 'Fsharp', 'Asharp'],
    Bsus4: ['B', 'E', 'Fsharp'],
    Bdim: ['B', 'D', 'F'],
    B7: ['B', 'Dsharp', 'Fsharp', 'A'],
    Bm7: ['B', 'D', 'Fsharp', 'A'],
    Bm7b5: ['B', 'D', 'F', 'A'],
  
    Csharp: ['Csharp', 'F', 'Gsharp'],
    Db: ['Csharp', 'F', 'Gsharp'],
    Csharpm: ['Csharp', 'E', 'Gsharp'],
    Csharpmaj7: ['Csharp', 'F', 'Gsharp', 'C'],
    Csharpsus4: ['Csharp', 'Fsharp', 'Gsharp'],
    Csharpdim: ['Csharp', 'E', 'G'],
    Csharp7: ['Csharp', 'F', 'Gsharp', 'B'],
    Csharpm7: ['Csharp', 'E', 'Gsharp', 'B'],
    Csharpm7b5: ['Csharp', 'E', 'G', 'B'],
  
    Dsharp: ['Dsharp', 'G', 'Asharp'],
    Eb: ['Dsharp', 'G', 'Asharp'],
    Dsharpm: ['Dsharp', 'Fsharp', 'Asharp'],
    Dsharpmaj7: ['Dsharp', 'G', 'Asharp', 'D'],
    Dsharpsus4: ['Dsharp', 'Gsharp', 'Asharp'],
    Dsharpdim: ['Dsharp', 'Fsharp', 'A'],
    Dsharp7: ['Dsharp', 'G', 'Asharp', 'Csharp'],
    Dsharpm7: ['Dsharp', 'Fsharp', 'Asharp', 'Csharp'],
    Dsharpm7b5: ['Dsharp', 'Fsharp', 'A', 'Csharp'],
  
    Fsharp: ['Fsharp', 'Asharp', 'Csharp'],
    Gb: ['Fsharp', 'Asharp', 'Csharp'],
    Fsharpm: ['Fsharp', 'A', 'Csharp'],
    Fsharpmaj7: ['Fsharp', 'Asharp', 'Csharp', 'F'],
    Fsharpsus4: ['Fsharp', 'B', 'Csharp'],
    Fsharpdim: ['Fsharp', 'A', 'C'],
    Fsharp7: ['Fsharp', 'Asharp', 'Csharp', 'E'],
    Fsharpm7: ['Fsharp', 'A', 'Csharp', 'E'],
    Fsharpm7b5: ['Fsharp', 'A', 'C', 'E'],
  
    Gsharp: ['Gsharp', 'C', 'Dsharp'],
    Ab: ['Gsharp', 'C', 'Dsharp'],
    Gsharpm: ['Gsharp', 'B', 'Dsharp'],
    Gsharpmaj7: ['Gsharp', 'C', 'Dsharp', 'G'],
    Gsharpsus4: ['Gsharp', 'Csharp', 'Dsharp'],
    Gsharpdim: ['Gsharp', 'B', 'D'],
    Gsharp7: ['Gsharp', 'C', 'Dsharp', 'Fsharp'],
    Gsharpm7: ['Gsharp', 'B', 'Dsharp', 'Fsharp'],
    Gsharpm7b5: ['Gsharp', 'B', 'D', 'Fsharp'],
  
    Asharp: ['Asharp', 'D', 'F'],
    Bb: ['Asharp', 'D', 'F'],
    Asharpm: ['Asharp', 'Csharp', 'F'],
    Bbm: ['Asharp', 'Csharp', 'F'],
    Asharpmaj7: ['Asharp', 'D', 'F', 'A'],
    Bbmaj7: ['Asharp', 'D', 'F', 'A'],
    Asharpsus4: ['Asharp', 'Dsharp', 'F'],
    Bbsus4: ['Asharp', 'Dsharp', 'F'],
    Asharpdim: ['Asharp', 'C', 'E'],
    Asharp7: ['Asharp', 'D', 'F', 'Gsharp'],
    Asharpm7: ['Asharp', 'Csharp', 'F', 'Gsharp'],
    Asharpm7b5: ['Asharp', 'C', 'E', 'Gsharp']
  
  };

  // 1.3 Esportazione di scale e accordi
  export { scales, chords };