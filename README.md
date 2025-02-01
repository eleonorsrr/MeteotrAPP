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
By opening the app, a quick tutorial of the main features of the app will be displayed. This will allow the user to have a more functional and coherent flow in the creative experience, through a step by step mini guide.
The interface is divdided in sections, explained below.

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
- **Instrument and City Selection Selector:** Choose from a variety of sounds: **Manor Grand, Soul Pad, Grand Piano, Night Blade**. Type and press 'Go' to visualize the weather conditions of any city in the world! A suggestion of a suitable instrument for a selected weather condition will be provided.
  
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

 
## 🎵 Usage modes: two creative experiences

MeteotrAPP offers two distinct modes for generating chord progressions:

### 🌍 Automatic Mode
In this mode, users can immediately search for a city using the search bar. Once a city is selected and the **Go** button (or the Enter key) is pressed, the app fetches real-time weather data using the **OpenWeather API**. The detected weather condition will:

- Highlight the corresponding **weather button**.  
- Change the background to reflect the weather.  
- Generate a **random chord progression** based on the relevant scale.  

For example, if the searched city has a **clear sky**, a random progression from the **Major Scale** (e.g., D Major) will be suggested.
<img width="500" alt="re maggiore" src="https://github.com/user-attachments/assets/49ad82a1-e136-495e-be72-1aa16dfcd16a" />

### 🎮 Play Mode
This mode allows users to manually select a weather condition without relying on city-based weather data.

- Select a condition choosing from one of the 4 **weather buttons** (to activate the characteristic sound, or go directly to the root note selection).
- Choose one of the **7 available root notes** for that condition.  
- The chord progression of the selected scale will appear.  

For example, if the user selects **Rainy** and then chooses **E** from the dropdown, the app will display **chords from the E Minor Scale**.
<img width="500" alt="mi minore" src="https://github.com/user-attachments/assets/fd1c34e4-2602-4042-a01d-adfc3375d01c" />

## Users' feedback

To refine and enhance our app, we created a **Google Form** and shared it with friends to gather valuable insights. The survey was divided into four main sections:  

- **General Experience**  
- **Musical Features**  
- **Technical Aspects**  
- **Improvements**  

Based on the responses collected, we dedicated time to improving the app according to the users' needs and feedback. Some of the features requested by users are listed below:
- Addition of a Grand Piano among the possible intruments available;
- Possibility to type the city of interest and directly submit it with the Enter key (not just with the Go button);
- Addition of instructions to a better understanding of the features of the app
  
Below is a chart summarizing the overall trends in the responses from the users who participated in the test and survey:  
