// 1. Acquisizione, mappatura e preload dei campioni audio

// 1.1 Base URL delle note
const UrlNIGHTBLADE = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/night blade/';
const UrlSOULPAD = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/soul revived pad/';
const UrlMANOR = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/manor/';
const UrlGANYMEDE = 'https://eleonorsrr.github.io/MeteotrAPP/assets/sounds/ganymede/';


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

const ganymede = {
  C: new Audio(`${UrlGANYMEDE}Ganymede.wav`),
  Csharp: new Audio(`${UrlGANYMEDE}Ganymede_2.wav`),
  D: new Audio(`${UrlGANYMEDE}Ganymede_3.wav`),
  Dsharp: new Audio(`${UrlGANYMEDE}Ganymede_4.wav`),
  E: new Audio(`${UrlGANYMEDE}Ganymede_5.wav`),
  F: new Audio(`${UrlGANYMEDE}Ganymede_6.wav`),
  Fsharp: new Audio(`${UrlGANYMEDE}Ganymede_7.wav`),
  G: new Audio(`${UrlGANYMEDE}Ganymede_8.wav`),
  Gsharp: new Audio(`${UrlGANYMEDE}Ganymede_9.wav`),
  A: new Audio(`${UrlGANYMEDE}Ganymede_10.wav`),
  Asharp: new Audio(`${UrlGANYMEDE}Ganymede_11.wav`),
  B: new Audio(`${UrlGANYMEDE}Ganymede_12.wav`),
  C2: new Audio(`${UrlGANYMEDE}Ganymede_13.wav`),
  C2sharp: new Audio(`${UrlGANYMEDE}Ganymede_14.wav`),
  D2: new Audio(`${UrlGANYMEDE}Ganymede_15.wav`),
  D2sharp: new Audio(`${UrlGANYMEDE}Ganymede_16.wav`),
  E2: new Audio(`${UrlGANYMEDE}Ganymede_17.wav`),
  F2: new Audio(`${UrlGANYMEDE}Ganymede_18.wav`),
  F2sharp: new Audio(`${UrlGANYMEDE}Ganymede_19.wav`),
  G2: new Audio(`${UrlGANYMEDE}Ganymede_20.wav`),
  G2sharp: new Audio(`${UrlGANYMEDE}Ganymede_21.wav`),
  A2: new Audio(`${UrlGANYMEDE}Ganymede_22.wav`),
  A2sharp: new Audio(`${UrlGANYMEDE}Ganymede_23.wav`),
  B2: new Audio(`${UrlGANYMEDE}Ganymede_24.wav`),
  C3: new Audio(`${UrlGANYMEDE}Ganymede_25.wav`),
  C3sharp: new Audio(`${UrlGANYMEDE}Ganymede_26.wav`),
  D3: new Audio(`${UrlGANYMEDE}Ganymede_27.wav`),
  D3sharp: new Audio(`${UrlGANYMEDE}Ganymede_28.wav`),
  E3: new Audio(`${UrlGANYMEDE}Ganymede_29.wav`),
  F3: new Audio(`${UrlGANYMEDE}Ganymede_30.wav`),
  F3sharp: new Audio(`${UrlGANYMEDE}Ganymede_31.wav`),
  G3: new Audio(`${UrlGANYMEDE}Ganymede_32.wav`),
  G3sharp: new Audio(`${UrlGANYMEDE}Ganymede_33.wav`),
  A3: new Audio(`${UrlGANYMEDE}Ganymede_34.wav`),
  A3sharp: new Audio(`${UrlGANYMEDE}Ganymede_35.wav`),
  B3: new Audio(`${UrlGANYMEDE}Ganymede_36.wav`),
  C4: new Audio(`${UrlGANYMEDE}Ganymede_37.wav`)
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
Object.values(ganymede).forEach(audio => {
  audio.load();
});

// 1.4 Esportazione dei campioni
export { nightblade, manor, ganymede, soulpad };
