# MeteotrAPP: A Weather-Based Chord Progression Generator

## What is MeteotrAPP?

MeteotrAPP is a web app designed to inspire musicians and music lovers by generating chord progressions based on real-time weather conditions. By categorizing atmospheric conditions into four main types —**Sunny, Rainy, Cloudy, and Snowy**— the app assigns a unique harmonic character to each, allowing users to explore different moods and textures in their music.

Each weather condition is associated with a specific chord scale:
- ☀️ **Sunny** → Major Scale (bright, uplifting harmonies)  
- 🌧️ **Rainy** → Minor Scale (moody, emotional progressions)  
- ☁️ **Cloudy** → Suspended 4th (floating, unresolved tension)  
- ❄️ **Snowy** → Major 7th (soft, dreamy atmospheres)  

The app suggests chords tailored to the detected weather and lets users experiment with various musical parameters, including:
- 🎵 **Chord Selection & Playback:** Choose from suggested chords and loop them to build progressions.  
- 🎚️ **BPM & Time Signature Control:** Adjust the tempo and rhythmic feel of your loops.  
- 🔀 **Customizable Chord Order:** Arrange and reorder the selected chords to create unique sequences.  
- ✨ **Weather-Specific Effects:** Each condition comes with dedicated audio effects that enhance the overall sound.  

Whether you're looking for inspiration, experimenting with harmonies, or simply having fun with music creation, MeteotrAPP provides a unique way to blend meteorology and sound design. Let the weather shape your next musical idea!

<img width="1470" alt="tutto" src="https://github.com/user-attachments/assets/d75069df-1be7-406f-8cdd-a59c9e161e16" />

## 🎛️ App features: Interface Overview

### 🔝 Top Panel
The top panel contains essential controls for managing playback and tempo settings:

- 🟡 **Play Button:** Starts looping the selected chords.  
- 🔴 **Stop Button:** Stops playback without clearing the current selection.  
- 🟣 **Reset Button:** Clears the current selection, allowing a new one to be created.  
- ⏱️ **BPM Selector:** Adjusts the beats per minute (default: 120 BPM). Changes can only be made while the loop is paused.  
- 🎵 **Time Signature Selector:** Allows switching between **4/4, 3/4, 6/8, 2/4, 5/4, 7/4** (default: 4/4).
  
![barra](https://github.com/user-attachments/assets/cfceadc1-8758-41c2-b257-b328520a9c29)


### 🌦️ Central Panel
The central panel provides manual control over the weather-based sound selection:

- **Scale Dropdowns:** Select a root note from one of the four dropdown containers to select the corrisponding weather condition: it changes the background and displays the corresponding chords for that scale below in the same central panel.
- **Weather Buttons:** By clicking on the desidered weather button, a characteristic sound can be activated (it will highlight the button with a blue border). Pressing an active button again stops the sound, pressing another button stop the previous sound and activate the new one.

  <img width="500" alt="pannellocentrale" src="https://github.com/user-attachments/assets/47ae0373-2ac3-46ac-9b10-89edabbf1f4c" />

- **Map Panel:** A side panel allows users to locate and visualize the selected city on a map.

  <img width="500" alt="mappa" src="https://github.com/user-attachments/assets/ac5ac246-2b41-42f1-a8f3-59f32f11006a" />


### 🎹 Instrument & Weather Data Panel
The lower section of the interface provides additional customization and real-time weather information:
- **Instrument and City Selection Selector:** Choose from a variety of sounds: **Manor Grand, Soul Pad, Ganymede, Night Blade**. Type and press 'Go' to visualize the weather conditions of any city in the world!
  
  <img width="500" alt="scelte" src="https://github.com/user-attachments/assets/5058d3a3-86d0-4e34-bf60-562f1058c631" />

  
- **City Selection & Weather Data:** Changes the background based on the condition in the selected city and displays the current weather details for it, including:  
  - General condition (e.g., clear sky, light rain, broken clouds)  
  - Temperature (current, max, min)  
  - Wind speed and direction  
  - Local time in the selected city
  - Air humidity and pressure

 <img width="800" alt="scelte" src="https://github.com/user-attachments/assets/5671dfcd-b658-4e69-8ac7-a887b953baf0" />
  

### 🎼 Chord Arrangement Panel
The bottom section of the interface provides a space for arranging and modifying the chord progression:

- **Drag & Drop:** Rearrange selected chords manually.  
- ⚡ **Shuffle Feature:** Randomizes the order of selected chords for spontaneous inspiration.
  
  <img width="1000" alt="barrasotto" src="https://github.com/user-attachments/assets/8717203b-fc5c-4df4-a7a1-dd95e31959f6" />


 ---------------------------------

 
## Two creative experiences
  Le 2 modalità: interattiva e automatica 

## Tester feedback
  ⁠⁠Test sul consumatore: generare google form da inviare a tot persone per un lasso di tempo breve (finché funziona il backend), raccogliere i dati e stilare funzionalità e difetti dell’app secondo il parere esterno
