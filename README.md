# MeteotrAPP: A Weather-Based Chord Progression Generator

## What is MeteotrAPP?

MeteotrAPP is a web app designed to inspire musicians and music lovers by generating chord progressions based on real-time weather conditions. 'Meteo' and 'trap' represent the union of two functionalities: one linked to the weather conditions and the other symbolizing a space where new ideas can be 'captured' and developed in an original way, reflecting a fresh and creative approach. 'Trap' (not the musical genre) evokes the idea of a dynamic and innovative environment where music and weather merge in surprising ways, symbolizing a unique fusion of elements you wouldn’t normally expect together.
By categorizing atmospheric conditions into four main types —Sunny, Rainy, Cloudy, and Snowy— the app assigns a unique harmonic character to each, allowing users to explore different moods and textures in their music.

Each weather condition is associated with a specific chord scale:
- ☀️ **Sunny** → Major Chords (bright, uplifting harmonies)  
- 🌧️ **Rainy** → Minor Chords (moody, emotional progressions)  
- ☁️ **Cloudy** → Suspended 4th Chords & colorful variations (floating, unresolved tension)  
- ❄️ **Snowy** → Major 7th Chords (soft, dreamy atmospheres)  

The app suggests chords tailored to the detected weather and lets users experiment with various musical parameters, including:
- 🎵 **Chord Selection & Playback:** Choose from suggested chords and loop them to build progressions.  
- 🎚️ **BPM & Time Signature Control:** Adjust the tempo and rhythmic feel of your loops.  
- 🔀 **Customizable Chord Order:** Arrange and reorder the selected chords to create unique sequences.  
- ✨ **Weather-Specific Effects:** Each condition comes with dedicated audio effects that enhance the overall sound.  

Whether you're looking for inspiration, experimenting with harmonies, or simply having fun with music creation, MeteotrAPP provides a unique way to blend meteorology and sound design. Let the weather shape your next musical idea!

<img width="1470" alt="tutto" src="https://github.com/user-attachments/assets/b295d62a-975a-4502-87d6-84a0bc271285" />



## 🎛️ App features: Interface Overview
By opening the app, a quick tutorial of the main features of the app will be displayed. This will allow the user to have a more functional and coherent flow in the creative experience, through a step by step mini guide.
The interface is divided in sections, explained below.

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
- **Chord buttons:** The chords associated with the scale, suggested or chosen, will be displayed in the buttons below the dropdowns. By holding down the button, the notes played are shown.

  <img width="600" alt="tutto" src="https://github.com/user-attachments/assets/8775f908-8a7a-4ac4-88cb-edd1977add04" />
  
  <img width="300" alt="tutto" src="https://github.com/user-attachments/assets/c32ca7f0-d418-4e5d-ba41-7596e0847bbf" />

- **Map Panel:** A side panel allows users to locate and visualize the selected city on a map. It is also possible to select an area/city directly by clicking on it.

  <img width="500" alt="mappa" src="https://github.com/user-attachments/assets/ac5ac246-2b41-42f1-a8f3-59f32f11006a" />


### 🎹 Instrument & Weather Data Panel
The lower section of the interface provides additional customization and real-time weather information:
- **Instrument and City Selection:** Choose from a variety of sounds, such as **Manor Grand, Soul Pad, Grand Piano, Night Blade, Epiano, Ephemeral, Diva**. Type and press 'Go' to visualize the weather conditions of any city in the world! A suggestion of a suitable instrument for a selected weather condition will be provided.

  <img width="500" alt="mappa" src="https://github.com/user-attachments/assets/565cd09c-f77a-476e-9937-bd3ab6052955" />

- **Weather Data:** Changes the background based on the condition in the selected city and displays the current weather details for it, including:  
  - General condition (e.g., clear sky, light rain, broken clouds)  
  - Temperature (current, max, min)  
  - Wind speed and direction  
  - Local time in the selected city
  - Air humidity and pressure

  ![weather](https://github.com/user-attachments/assets/5f9b2632-9d14-403f-a32a-2ac13f0bea8c)


### 🎼 Chord Arrangement Panel
The bottom section of the interface provides a space for arranging and modifying the chord progression for a maximum of 8 chords:

- **Drag & Drop:** Rearrange selected chords manually.  
- ⚡ **Shuffle Feature:** Randomizes the order of selected chords for spontaneous inspiration.
  
  ![bottompanel](https://github.com/user-attachments/assets/0bc0a40e-8aeb-470c-99e5-c9e85c2b815a)


 ---------------------------------

 
## 🎵 Usage modes: two creative experiences

MeteotrAPP offers two distinct modes for generating chord progressions:

### 🌍 Automatic Mode
In this mode, users can immediately search for a city using the search bar or flying around the world and clicking on the perfect city to get inspired. Once a city is selected, the app fetches real-time weather data using the **OpenWeather API**. The detected weather condition will:

- Highlight the corresponding **weather button**.  
- Change the background to reflect the weather.  
- Generate a **random scale** based on the scale type associated with it.  

For example, if the searched city has a **clear sky**, the chords from the **Major Scale** (e.g., D Major) will be suggested.

  ![re maggiore](https://github.com/user-attachments/assets/eac53a26-5d0f-47d0-9bc8-10929098a0d0)

  
### 🎮 Play Mode
This mode allows users to manually select a weather condition without relying on city-based weather data.

- Select a condition choosing from one of the 4 **weather buttons** (to activate the characteristic sound, or go directly to the root note selection).
- Choose one of the **7 available root notes** for that condition.  
- The chords of the selected scale will appear.  

For example, if the user selects **Rainy** and then chooses **E** from the dropdown, the app will display **chords from the E Minor Scale**.

  ![mi minore](https://github.com/user-attachments/assets/823919c2-592b-48c0-9679-6ead8d43f2db)

## Users' feedback

To refine and enhance our app, we created a Google Form and shared it with friends to gather valuable feedbacks. The survey was divided into four main sections:

### General Experience
#### 1. Did you find the idea of ​​combining weather and music fun? 

The 90% of the users enjoyed the idea to combine weather and music.

   <img width="459" alt="domanda1" src="https://github.com/user-attachments/assets/212c853c-92b1-49da-a583-40a94a718bcc" />

#### 2. How intuitive is the app's user interface?

The 55% of the users found the app's interface intuitive.

  <img width="701" alt="domanda2" src="https://github.com/user-attachments/assets/95e57e2c-6163-4fe1-af82-4665c08a8b0d" />

#### 3. How would you rate your overall experience with the app? 
   
The 75% of the users found the experience postitive and fun.

  <img width="704" alt="domanda3" src="https://github.com/user-attachments/assets/15e041b6-fea6-41d4-a7f4-197d07528d66" />

### Musical Features
#### 4. Which features have you used the most? 
  
The 55% of the users prefers the automatic mode, the other 45% prefers the play mode. 

  <img width="580" alt="domanda4" src="https://github.com/user-attachments/assets/cc275b14-3e28-4cf0-8761-f228c2e20ba9" />

#### 5. Did you find the main features easy to understand and use? 
  
The 85% of the users found the main features easy to use.

<img width="444" alt="domanda5" src="https://github.com/user-attachments/assets/1048171b-375f-4fef-8dc2-0043e5b397a9" />

#### 6. Were the proposed scales and chords useful and intuitive in creating your symphony? 
   
The 90% of the users found the proposed scales and chords useful and intuitive in creating their symphony.

<img width="444" alt="domanda6" src="https://github.com/user-attachments/assets/033236eb-25fa-48f3-8db8-e1ee6f5d7dde" />

#### 7. Do you like the tools provided? What additional tools would you like to have? 
  
Most of the users suggested to add classical instruments like a grand piano (which we decided to add from this feedback), a guitar or a trumpet. Other users were satisfied with the particular sounds we added.

### Technical Aspects
#### 8. Have you encountered any technical issues or bugs while using the app?
   
For 90% of users the app worked without bugs or interruptions.

  <img width="444" alt="domanda8" src="https://github.com/user-attachments/assets/87ea4803-af61-456b-ad9f-8f2cab9547b9" />

#### 9. Is the transition between different weather conditions and associated sounds smooth?
   
The 95% of the users found the transition between different weather conditions and associated sounds smooth.

   <img width="444" alt="domanda9" src="https://github.com/user-attachments/assets/b06b5e70-f9cc-40c2-a45a-e6f93cbf87a9" />
   
#### 10. How would you rate the graphics and design of the app? 
  
Most of the users appreciated the graphics of MeteotrAPP!

  <img width="713" alt="domanda10" src="https://github.com/user-attachments/assets/b9a37da1-523e-4582-a1f9-1ef7deec973c" />

#### 11. Would you recommend this app to a friend interested in music and creativity?
    
The 90% of the users would recommand this app to friends.

   <img width="409" alt="domanda11" src="https://github.com/user-attachments/assets/04ccd1a1-5dfd-47f2-ba75-3e4914e37e90" />

## Improvements
Based on the responses collected, we dedicated time to improving the app according to the users' needs and feedback. Some of the features requested by users are listed below:
- Addition of more instruments among the possible intruments available;
- Possibility to directly submit the city of interest with the Enter key (not just with the Go button);
- Addition of instructions to a better understanding of the features of the app;
- Making the map on the right panel interactive (if you press on it, it detectes the location and it returns the weather data.
