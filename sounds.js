// 1. Acquisizione, mappatura e preload dei campioni audio

// 1.1 Base URL delle note
const UrlNIGHTBLADE = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/night blade/';
const UrlSOULPAD = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/soul revived pad/';
const UrlMANOR = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/manor/';
const UrlGRANDPIANO = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/grand piano/';
const UrlDiva = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/diva/';
const UrlEphemeral = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/ephemeral/';
const UrlEpiano = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/epiano/';


// 1.2 Mappatura delle note con i rispettivi URL
const soulpad = {
  C: new Audio(`${UrlSOULPAD}soul revived pad.wav`), 
  Csharp: new Audio(`${UrlSOULPAD}soul revived pad_2.wav`), 
  D: new Audio(`${UrlSOULPAD}soul revived pad_3.wav`), 
  Dsharp: new Audio(`${UrlSOULPAD}soul revived pad_4.wav`),
  E: new Audio(`${UrlSOULPAD}soul revived pad_5.wav`),
  F: new Audio(`${UrlSOULPAD}soul revived pad_6.wav`), 
  Fsharp: new Audio(`${UrlSOULPAD}soul revived pad_7.wav`),
  G: new Audio(`${UrlSOULPAD}soul revived pad_8.wav`),
  Gsharp: new Audio(`${UrlSOULPAD}soul revived pad_9.wav`),
  A: new Audio(`${UrlSOULPAD}soul revived pad_10.wav`),
  Asharp: new Audio(`${UrlSOULPAD}soul revived pad_11.wav`),
  B: new Audio(`${UrlSOULPAD}soul revived pad_12.wav`),
  C2: new Audio(`${UrlSOULPAD}soul revived pad_13.wav`),
  C2sharp: new Audio(`${UrlSOULPAD}soul revived pad_14.wav`),
  D2: new Audio(`${UrlSOULPAD}soul revived pad_15.wav`),
  D2sharp: new Audio(`${UrlSOULPAD}soul revived pad_16.wav`),
  E2: new Audio(`${UrlSOULPAD}soul revived pad_17.wav`),
  F2: new Audio(`${UrlSOULPAD}soul revived pad_18.wav`),
  F2sharp: new Audio(`${UrlSOULPAD}soul revived pad_19.wav`),
  G2: new Audio(`${UrlSOULPAD}soul revived pad_20.wav`),
  G2sharp: new Audio(`${UrlSOULPAD}soul revived pad_21.wav`),
  A2: new Audio(`${UrlSOULPAD}soul revived pad_22.wav`),
  A2sharp: new Audio(`${UrlSOULPAD}soul revived pad_23.wav`),
  B2: new Audio(`${UrlSOULPAD}soul revived pad_24.wav`),
  C3: new Audio(`${UrlSOULPAD}soul revived pad_25.wav`),
  C3sharp: new Audio(`${UrlSOULPAD}soul revived pad_26.wav`),
  D3: new Audio(`${UrlSOULPAD}soul revived pad_27.wav`),
  D3sharp: new Audio(`${UrlSOULPAD}soul revived pad_28.wav`),
  E3: new Audio(`${UrlSOULPAD}soul revived pad_29.wav`),
  F3: new Audio(`${UrlSOULPAD}soul revived pad_30.wav`),
  F3sharp: new Audio(`${UrlSOULPAD}soul revived pad_31.wav`),
  G3: new Audio(`${UrlSOULPAD}soul revived pad_32.wav`),
  G3sharp: new Audio(`${UrlSOULPAD}soul revived pad_33.wav`),
  A3: new Audio(`${UrlSOULPAD}soul revived pad_34.wav`),
  A3sharp: new Audio(`${UrlSOULPAD}soul revived pad_35.wav`),
  B3: new Audio(`${UrlSOULPAD}soul revived pad_36.wav`),
  C4: new Audio(`${UrlSOULPAD}soul revived pad_37.wav`)
};

const nightblade = {
  C: new Audio(`${UrlNIGHTBLADE}night blade synth.wav`), 
  Csharp: new Audio(`${UrlNIGHTBLADE}night blade synth_2.wav`), 
  D: new Audio(`${UrlNIGHTBLADE}night blade synth_3.wav`), 
  Dsharp: new Audio(`${UrlNIGHTBLADE}night blade synth_4.wav`),
  E: new Audio(`${UrlNIGHTBLADE}night blade synth_5.wav`),
  F: new Audio(`${UrlNIGHTBLADE}night blade synth_6.wav`), 
  Fsharp: new Audio(`${UrlNIGHTBLADE}night blade synth_7.wav`),
  G: new Audio(`${UrlNIGHTBLADE}night blade synth_8.wav`),
  Gsharp: new Audio(`${UrlNIGHTBLADE}night blade synth_9.wav`),
  A: new Audio(`${UrlNIGHTBLADE}night blade synth_10.wav`),
  Asharp: new Audio(`${UrlNIGHTBLADE}night blade synth_11.wav`),
  B: new Audio(`${UrlNIGHTBLADE}night blade synth_12.wav`),
  C2: new Audio(`${UrlNIGHTBLADE}night blade synth_13.wav`),
  C2sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_14.wav`),
  D2: new Audio(`${UrlNIGHTBLADE}night blade synth_15.wav`),
  D2sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_16.wav`),
  E2: new Audio(`${UrlNIGHTBLADE}night blade synth_17.wav`),
  F2: new Audio(`${UrlNIGHTBLADE}night blade synth_18.wav`),
  F2sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_19.wav`),
  G2: new Audio(`${UrlNIGHTBLADE}night blade synth_20.wav`),
  G2sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_21.wav`),
  A2: new Audio(`${UrlNIGHTBLADE}night blade synth_22.wav`),
  A2sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_23.wav`),
  B2: new Audio(`${UrlNIGHTBLADE}night blade synth_24.wav`),
  C3: new Audio(`${UrlNIGHTBLADE}night blade synth_25.wav`),
  C3sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_26.wav`),
  D3: new Audio(`${UrlNIGHTBLADE}night blade synth_27.wav`),
  D3sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_28.wav`),
  E3: new Audio(`${UrlNIGHTBLADE}night blade synth_29.wav`),
  F3: new Audio(`${UrlNIGHTBLADE}night blade synth_30.wav`),
  F3sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_31.wav`),
  G3: new Audio(`${UrlNIGHTBLADE}night blade synth_32.wav`),
  G3sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_33.wav`),
  A3: new Audio(`${UrlNIGHTBLADE}night blade synth_34.wav`),
  A3sharp: new Audio(`${UrlNIGHTBLADE}night blade synth_35.wav`),
  B3: new Audio(`${UrlNIGHTBLADE}night blade synth_36.wav`),
  C4: new Audio(`${UrlNIGHTBLADE}night blade synth_37.wav`)
};

const manor = {
  C: new Audio(`${UrlMANOR}Manor grand.wav`),
  Csharp: new Audio(`${UrlMANOR}Manor grand_2.wav`),
  D: new Audio(`${UrlMANOR}Manor grand_3.wav`),
  Dsharp: new Audio(`${UrlMANOR}Manor grand_4.wav`),
  E: new Audio(`${UrlMANOR}Manor grand_5.wav`),
  F: new Audio(`${UrlMANOR}Manor grand_6.wav`),
  Fsharp: new Audio(`${UrlMANOR}Manor grand_7.wav`),
  G: new Audio(`${UrlMANOR}Manor grand_8.wav`),
  Gsharp: new Audio(`${UrlMANOR}Manor grand_9.wav`),
  A: new Audio(`${UrlMANOR}Manor grand_10.wav`),
  Asharp: new Audio(`${UrlMANOR}Manor grand_11.wav`),
  B: new Audio(`${UrlMANOR}Manor grand_12.wav`),
  C2: new Audio(`${UrlMANOR}Manor grand_13.wav`),
  C2sharp: new Audio(`${UrlMANOR}Manor grand_14.wav`),
  D2: new Audio(`${UrlMANOR}Manor grand_15.wav`),
  D2sharp: new Audio(`${UrlMANOR}Manor grand_16.wav`),
  E2: new Audio(`${UrlMANOR}Manor grand_17.wav`),
  F2: new Audio(`${UrlMANOR}Manor grand_18.wav`),
  F2sharp: new Audio(`${UrlMANOR}Manor grand_19.wav`),
  G2: new Audio(`${UrlMANOR}Manor grand_20.wav`),
  G2sharp: new Audio(`${UrlMANOR}Manor grand_21.wav`),
  A2: new Audio(`${UrlMANOR}Manor grand_22.wav`),
  A2sharp: new Audio(`${UrlMANOR}Manor grand_23.wav`),
  B2: new Audio(`${UrlMANOR}Manor grand_24.wav`),
  C3: new Audio(`${UrlMANOR}Manor grand_25.wav`),
  C3sharp: new Audio(`${UrlMANOR}Manor grand_26.wav`),
  D3: new Audio(`${UrlMANOR}Manor grand_27.wav`),
  D3sharp: new Audio(`${UrlMANOR}Manor grand_28.wav`),
  E3: new Audio(`${UrlMANOR}Manor grand_29.wav`),
  F3: new Audio(`${UrlMANOR}Manor grand_30.wav`),
  F3sharp: new Audio(`${UrlMANOR}Manor grand_31.wav`),
  G3: new Audio(`${UrlMANOR}Manor grand_32.wav`),
  G3sharp: new Audio(`${UrlMANOR}Manor grand_33.wav`),
  A3: new Audio(`${UrlMANOR}Manor grand_34.wav`),
  A3sharp: new Audio(`${UrlMANOR}Manor grand_35.wav`),
  B3: new Audio(`${UrlMANOR}Manor grand_36.wav`),
  C4: new Audio(`${UrlMANOR}Manor grand_37.wav`)
};

const grandpiano = {
  C: new Audio(`${UrlGRANDPIANO}GRAND PIANO.wav`),
  Csharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_2.wav`),
  D: new Audio(`${UrlGRANDPIANO}GRAND PIANO_3.wav`),
  Dsharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_4.wav`),
  E: new Audio(`${UrlGRANDPIANO}GRAND PIANO_5.wav`),
  F: new Audio(`${UrlGRANDPIANO}GRAND PIANO_6.wav`),
  Fsharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_7.wav`),
  G: new Audio(`${UrlGRANDPIANO}GRAND PIANO_8.wav`),
  Gsharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_9.wav`),
  A: new Audio(`${UrlGRANDPIANO}GRAND PIANO_10.wav`),
  Asharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_11.wav`),
  B: new Audio(`${UrlGRANDPIANO}GRAND PIANO_12.wav`),
  C2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_13.wav`),
  C2sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_14.wav`),
  D2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_15.wav`),
  D2sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_16.wav`),
  E2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_17.wav`),
  F2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_18.wav`),
  F2sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_19.wav`),
  G2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_20.wav`),
  G2sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_21.wav`),
  A2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_22.wav`),
  A2sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_23.wav`),
  B2: new Audio(`${UrlGRANDPIANO}GRAND PIANO_24.wav`),
  C3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_25.wav`),
  C3sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_26.wav`),
  D3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_27.wav`),
  D3sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_28.wav`),
  E3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_29.wav`),
  F3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_30.wav`),
  F3sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_31.wav`),
  G3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_32.wav`),
  G3sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_33.wav`),
  A3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_34.wav`),
  A3sharp: new Audio(`${UrlGRANDPIANO}GRAND PIANO_35.wav`),
  B3: new Audio(`${UrlGRANDPIANO}GRAND PIANO_36.wav`),
  C4: new Audio(`${UrlGRANDPIANO}GRAND PIANO_37.wav`)
};

const diva = {
  C: new Audio(`${UrlDiva}Diva.wav`), 
  Csharp: new Audio(`${UrlDiva}Diva_2.wav`), 
  D: new Audio(`${UrlDiva}Diva_3.wav`), 
  Dsharp: new Audio(`${UrlDiva}Diva_4.wav`),
  E: new Audio(`${UrlDiva}Diva_5.wav`),
  F: new Audio(`${UrlDiva}Diva_6.wav`), 
  Fsharp: new Audio(`${UrlDiva}Diva_7.wav`),
  G: new Audio(`${UrlDiva}Diva_8.wav`),
  Gsharp: new Audio(`${UrlDiva}Diva_9.wav`),
  A: new Audio(`${UrlDiva}Diva_10.wav`),
  Asharp: new Audio(`${UrlDiva}Diva_11.wav`),
  B: new Audio(`${UrlDiva}Diva_12.wav`),
  C2: new Audio(`${UrlDiva}Diva_13.wav`),
  C2sharp: new Audio(`${UrlDiva}Diva_14.wav`),
  D2: new Audio(`${UrlDiva}Diva_15.wav`),
  D2sharp: new Audio(`${UrlDiva}Diva_16.wav`),
  E2: new Audio(`${UrlDiva}Diva_17.wav`),
  F2: new Audio(`${UrlDiva}Diva_18.wav`),
  F2sharp: new Audio(`${UrlDiva}Diva_19.wav`),
  G2: new Audio(`${UrlDiva}Diva_20.wav`),
  G2sharp: new Audio(`${UrlDiva}Diva_21.wav`),
  A2: new Audio(`${UrlDiva}Diva_22.wav`),
  A2sharp: new Audio(`${UrlDiva}Diva_23.wav`),
  B2: new Audio(`${UrlDiva}Diva_24.wav`),
  C3: new Audio(`${UrlDiva}Diva_25.wav`),
  C3sharp: new Audio(`${UrlDiva}Diva_26.wav`),
  D3: new Audio(`${UrlDiva}Diva_27.wav`),
  D3sharp: new Audio(`${UrlDiva}Diva_28.wav`),
  E3: new Audio(`${UrlDiva}Diva_29.wav`),
  F3: new Audio(`${UrlDiva}Diva_30.wav`),
  F3sharp: new Audio(`${UrlDiva}Diva_31.wav`),
  G3: new Audio(`${UrlDiva}Diva_32.wav`),
  G3sharp: new Audio(`${UrlDiva}Diva_33.wav`),
  A3: new Audio(`${UrlDiva}Diva_34.wav`),
  A3sharp: new Audio(`${UrlDiva}Diva_35.wav`),
  B3: new Audio(`${UrlDiva}Diva_36.wav`),
  C4: new Audio(`${UrlDiva}Diva_37.wav`)
};

const ephemeral = {
  C: new Audio(`${UrlEphemeral}Ephemeral.wav`), 
  Csharp: new Audio(`${UrlEphemeral}Ephemeral_2.wav`), 
  D: new Audio(`${UrlEphemeral}Ephemeral_3.wav`), 
  Dsharp: new Audio(`${UrlEphemeral}Ephemeral_4.wav`),
  E: new Audio(`${UrlEphemeral}Ephemeral_5.wav`),
  F: new Audio(`${UrlEphemeral}Ephemeral_6.wav`), 
  Fsharp: new Audio(`${UrlEphemeral}Ephemeral_7.wav`),
  G: new Audio(`${UrlEphemeral}Ephemeral_8.wav`),
  Gsharp: new Audio(`${UrlEphemeral}Ephemeral_9.wav`),
  A: new Audio(`${UrlEphemeral}Ephemeral_10.wav`),
  Asharp: new Audio(`${UrlEphemeral}Ephemeral_11.wav`),
  B: new Audio(`${UrlEphemeral}Ephemeral_12.wav`),
  C2: new Audio(`${UrlEphemeral}Ephemeral_13.wav`),
  C2sharp: new Audio(`${UrlEphemeral}Ephemeral_14.wav`),
  D2: new Audio(`${UrlEphemeral}Ephemeral_15.wav`),
  D2sharp: new Audio(`${UrlEphemeral}Ephemeral_16.wav`),
  E2: new Audio(`${UrlEphemeral}Ephemeral_17.wav`),
  F2: new Audio(`${UrlEphemeral}Ephemeral_18.wav`),
  F2sharp: new Audio(`${UrlEphemeral}Ephemeral_19.wav`),
  G2: new Audio(`${UrlEphemeral}Ephemeral_20.wav`),
  G2sharp: new Audio(`${UrlEphemeral}Ephemeral_21.wav`),
  A2: new Audio(`${UrlEphemeral}Ephemeral_22.wav`),
  A2sharp: new Audio(`${UrlEphemeral}Ephemeral_23.wav`),
  B2: new Audio(`${UrlEphemeral}Ephemeral_24.wav`),
  C3: new Audio(`${UrlEphemeral}Ephemeral_25.wav`),
  C3sharp: new Audio(`${UrlEphemeral}Ephemeral_26.wav`),
  D3: new Audio(`${UrlEphemeral}Ephemeral_27.wav`),
  D3sharp: new Audio(`${UrlEphemeral}Ephemeral_28.wav`),
  E3: new Audio(`${UrlEphemeral}Ephemeral_29.wav`),
  F3: new Audio(`${UrlEphemeral}Ephemeral_30.wav`),
  F3sharp: new Audio(`${UrlEphemeral}Ephemeral_31.wav`),
  G3: new Audio(`${UrlEphemeral}Ephemeral_32.wav`),
  G3sharp: new Audio(`${UrlEphemeral}Ephemeral_33.wav`),
  A3: new Audio(`${UrlEphemeral}Ephemeral_34.wav`),
  A3sharp: new Audio(`${UrlEphemeral}Ephemeral_35.wav`),
  B3: new Audio(`${UrlEphemeral}Ephemeral_36.wav`),
  C4: new Audio(`${UrlEphemeral}Ephemeral_37.wav`)
};

const epiano = {
  C: new Audio(`${UrlEpiano}epiano.wav`), 
  Csharp: new Audio(`${UrlEpiano}epiano_2.wav`), 
  D: new Audio(`${UrlEpiano}epiano_3.wav`), 
  Dsharp: new Audio(`${UrlEpiano}epiano_4.wav`),
  E: new Audio(`${UrlEpiano}epiano_5.wav`),
  F: new Audio(`${UrlEpiano}epiano_6.wav`), 
  Fsharp: new Audio(`${UrlEpiano}epiano_7.wav`),
  G: new Audio(`${UrlEpiano}epiano_8.wav`),
  Gsharp: new Audio(`${UrlEpiano}epiano_9.wav`),
  A: new Audio(`${UrlEpiano}epiano_10.wav`),
  Asharp: new Audio(`${UrlEpiano}epiano_11.wav`),
  B: new Audio(`${UrlEpiano}epiano_12.wav`),
  C2: new Audio(`${UrlEpiano}epiano_13.wav`),
  C2sharp: new Audio(`${UrlEpiano}epiano_14.wav`),
  D2: new Audio(`${UrlEpiano}epiano_15.wav`),
  D2sharp: new Audio(`${UrlEpiano}epiano_16.wav`),
  E2: new Audio(`${UrlEpiano}epiano_17.wav`),
  F2: new Audio(`${UrlEpiano}epiano_18.wav`),
  F2sharp: new Audio(`${UrlEpiano}epiano_19.wav`),
  G2: new Audio(`${UrlEpiano}epiano_20.wav`),
  G2sharp: new Audio(`${UrlEpiano}epiano_21.wav`),
  A2: new Audio(`${UrlEpiano}epiano_22.wav`),
  A2sharp: new Audio(`${UrlEpiano}epiano_23.wav`),
  B2: new Audio(`${UrlEpiano}epiano_24.wav`),
  C3: new Audio(`${UrlEpiano}epiano_25.wav`),
  C3sharp: new Audio(`${UrlEpiano}epiano_26.wav`),
  D3: new Audio(`${UrlEpiano}epiano_27.wav`),
  D3sharp: new Audio(`${UrlEpiano}epiano_28.wav`),
  E3: new Audio(`${UrlEpiano}epiano_29.wav`),
  F3: new Audio(`${UrlEpiano}epiano_30.wav`),
  F3sharp: new Audio(`${UrlEpiano}epiano_31.wav`),
  G3: new Audio(`${UrlEpiano}epiano_32.wav`),
  G3sharp: new Audio(`${UrlEpiano}epiano_33.wav`),
  A3: new Audio(`${UrlEpiano}epiano_34.wav`),
  A3sharp: new Audio(`${UrlEpiano}epiano_35.wav`),
  B3: new Audio(`${UrlEpiano}epiano_36.wav`),
  C4: new Audio(`${UrlEpiano}epiano_37.wav`)
};







// 1.3 Preload dei campioni
Object.values(nightblade).forEach(audio => {
  audio.load();
});
Object.values(soulpad).forEach(audio => {
  audio.load();
});
Object.values(manor).forEach(audio => {
  audio.load();
});
Object.values(grandpiano).forEach(audio => {
  audio.load();
});
Object.values(epiano).forEach(audio => {
  audio.load();
});
Object.values(diva).forEach(audio => {
  audio.load();
});
Object.values(ephemeral).forEach(audio => {
  audio.load();
});


// 1.4 Esportazione dei campioni
export { nightblade, manor, grandpiano, soulpad, diva, ephemeral, epiano};
