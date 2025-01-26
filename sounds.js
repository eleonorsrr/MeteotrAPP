// 1. Acquisizione, mappatura e preload dei campioni audio

// 1.1 Base URL delle note
const UrlRhodes = 'https://frafra39.github.io/sound-pack2/RHODES ACTAM 1/';
const UrlEPIANO = 'https://frafra39.github.io/sound-pack2/ACTAM EPIANO/';
const UrlINDIAN = 'https://frafra39.github.io/sound-pack2/ACTAM INDIAN/';

// 1.2 Mappatura delle note con i rispettivi URL
const rhodes = {
  C: new Audio(`${UrlRhodes}Pattern 1_4.wav`), 
  Csharp: new Audio(`${UrlRhodes}Pattern 1_5.wav`), 
  D: new Audio(`${UrlRhodes}Pattern 1_6.wav`), 
  Dsharp: new Audio(`${UrlRhodes}Pattern 1_7.wav`),
  E: new Audio(`${UrlRhodes}Pattern 1_8.wav`),
  F: new Audio(`${UrlRhodes}Pattern 1_9.wav`), 
  Fsharp: new Audio(`${UrlRhodes}Pattern 1_10.wav`),
  G: new Audio(`${UrlRhodes}Pattern 1_11.wav`),
  Gsharp: new Audio(`${UrlRhodes}Pattern 1_12.wav`),
  A: new Audio(`${UrlRhodes}Pattern 1_13.wav`),
  Asharp: new Audio(`${UrlRhodes}Pattern 1_14.wav`),
  B: new Audio(`${UrlRhodes}Pattern 1_15.wav`),
  C2: new Audio(`${UrlRhodes}Pattern 1_16.wav`),
  C2sharp: new Audio(`${UrlRhodes}Pattern 1_17.wav`),
  D2: new Audio(`${UrlRhodes}Pattern 1_18.wav`),
  D2sharp: new Audio(`${UrlRhodes}Pattern 1_19.wav`),
  E2: new Audio(`${UrlRhodes}Pattern 1_20.wav`),
  F2: new Audio(`${UrlRhodes}Pattern 1_21.wav`),
  F2sharp: new Audio(`${UrlRhodes}Pattern 1_22.wav`),
  G2: new Audio(`${UrlRhodes}Pattern 1_23.wav`),
  G2sharp: new Audio(`${UrlRhodes}Pattern 1_24.wav`),
  A2: new Audio(`${UrlRhodes}Pattern 1_25.wav`),
  A2sharp: new Audio(`${UrlRhodes}Pattern 1_26.wav`),
  B2: new Audio(`${UrlRhodes}Pattern 1_27.wav`),
  C3: new Audio(`${UrlRhodes}Pattern 1_28.wav`),
};

const epiano = {
  C: new Audio(`${UrlEPIANO}EPIANO.wav`),
  Csharp: new Audio(`${UrlEPIANO}EPIANO_2.wav`),
  D: new Audio(`${UrlEPIANO}EPIANO_3.wav`),
  Dsharp: new Audio(`${UrlEPIANO}EPIANO_4.wav`),
  E: new Audio(`${UrlEPIANO}EPIANO_5.wav`),
  F: new Audio(`${UrlEPIANO}EPIANO_6.wav`),
  Fsharp: new Audio(`${UrlEPIANO}EPIANO_7.wav`),
  G: new Audio(`${UrlEPIANO}EPIANO_8.wav`),
  Gsharp: new Audio(`${UrlEPIANO}EPIANO_9.wav`),
  A: new Audio(`${UrlEPIANO}EPIANO_10.wav`),
  Asharp: new Audio(`${UrlEPIANO}EPIANO_11.wav`),
  B: new Audio(`${UrlEPIANO}EPIANO_12.wav`),
  C2: new Audio(`${UrlEPIANO}EPIANO_13.wav`),
  C2sharp: new Audio(`${UrlEPIANO}EPIANO_14.wav`),
  D2: new Audio(`${UrlEPIANO}EPIANO_15.wav`),
  D2sharp: new Audio(`${UrlEPIANO}EPIANO_16.wav`),
  E2: new Audio(`${UrlEPIANO}EPIANO_17.wav`),
  F2: new Audio(`${UrlEPIANO}EPIANO_18.wav`),
  F2sharp: new Audio(`${UrlEPIANO}EPIANO_19.wav`),
  G2: new Audio(`${UrlEPIANO}EPIANO_20.wav`),
  G2sharp: new Audio(`${UrlEPIANO}EPIANO_21.wav`),
  A2: new Audio(`${UrlEPIANO}EPIANO_22.wav`),
  A2sharp: new Audio(`${UrlEPIANO}EPIANO_23.wav`),
  B2: new Audio(`${UrlEPIANO}EPIANO_24.wav`),
  C3: new Audio(`${UrlEPIANO}EPIANO_25.wav`)
};

const indian = {
  C: new Audio(`${UrlINDIAN}Pattern 1_30.wav`), 
  Csharp: new Audio(`${UrlINDIAN}Pattern 1_31.wav`),  
  D: new Audio(`${UrlINDIAN}Pattern 1_32.wav`),  
  Dsharp: new Audio(`${UrlINDIAN}Pattern 1_33.wav`),  
  E: new Audio(`${UrlINDIAN}Pattern 1_34.wav`),
  F: new Audio(`${UrlINDIAN}Pattern 1_35.wav`), 
  Fsharp: new Audio(`${UrlINDIAN}Pattern 1_36.wav`),
  G: new Audio(`${UrlINDIAN}Pattern 1_37.wav`),
  Gsharp: new Audio(`${UrlINDIAN}Pattern 1_38.wav`),
  A: new Audio(`${UrlINDIAN}Pattern 1_39.wav`),
  Asharp: new Audio(`${UrlINDIAN}Pattern 1_40.wav`),
  B: new Audio(`${UrlINDIAN}Pattern 1_41.wav`),
  C2: new Audio(`${UrlINDIAN}Pattern 1_42.wav`),
  C2sharp: new Audio(`${UrlINDIAN}Pattern 1_43.wav`),
  D2: new Audio(`${UrlINDIAN}Pattern 1_44.wav`),
  D2sharp: new Audio(`${UrlRhodes}Pattern 1_45.wav`),
  E2: new Audio(`${UrlRhodes}Pattern 1_46.wav`),
  F2: new Audio(`${UrlRhodes}Pattern 1_47.wav`),
  F2sharp: new Audio(`${UrlINDIAN}Pattern 1_48.wav`),
  G2: new Audio(`${UrlINDIAN}Pattern 1_49.wav`),
  G2sharp: new Audio(`${UrlINDIAN}Pattern 1_50.wav`),
  A2: new Audio(`${UrlINDIAN}Pattern 1_51.wav`),
  A2sharp: new Audio(`${UrlINDIAN}Pattern 1_52.wav`),
  B2: new Audio(`${UrlINDIAN}Pattern 1_53.wav`),
  C3: new Audio(`${UrlINDIAN}Pattern 1_54.wav`),
};

// 1.3 Preload dei campioni
Object.values(rhodes).forEach(audio => {
  audio.load();
});
Object.values(epiano).forEach(audio => {
  audio.load();
});
Object.values(indian).forEach(audio => {
  audio.load();
});

// 1.4 Esportazione dei campioni
export { rhodes, epiano, indian };