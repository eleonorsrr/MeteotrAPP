// SCRIPT RELATIVO ALLA CREAZIONE E GESTIONE DEL TUTORIAL INTRODUTTIVO

document.addEventListener("DOMContentLoaded", () => {
  
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("intro-screen").classList.add("hidden");
  });

  // 1. Definizione della sequenza di steps nel tutorial
  
  const tutorialSteps = [
    {
      element: ".weather-panel",
      text: "In this section you can search for a geographic location. Weather data will be displayed, including current weather conditions, which is an essential information to determine which chords will be proposed and to recommend the most suitable instrument to reproduce them!"
    },
    {
      element: ".map-panel",
      text: "This map displays the location you searched for in the weather panel. To improve the interaction, it is also possible to select an area/city directly by clicking on it: this will have the same effect as choosing the city from the search bar, affecting the chords suggested",
    },
    {
      element: ".central-panel",
      text: "Here you can select the proposed chords based on the weather condition related to your search. You can also interact with this section dynamically: choose one of the four weather conditions and listen to its characteristic sound, select one of the available scales and create your melody with the chords that will be proposed to you. Also play with the sliders related to the characteristic sound of each weather condition to fully immerse yourself in the experience!"
    },
    {
      element: ".bottom-panel",
      text: "In this section you can view the chosen chords. You can change the order to your liking or, for a touch of unpredictability, you can randomize them by pressing the lightning button!"
    },
    {
      element: "#shuffle-btn",
      text: "Every time you press this button, the chords are randomly reordered."
    },
    {
      element: ".top-panel",
      text: "In this section you can adjust the BPM (tempo) and time signature of your melody. Once you have chosen, use the Play, Stop and Reset buttons to control the playback of what you have created!"
    }
  ];
  

    // 2. Definizione e creazione di box e pulsanti
    
    let currentStep = 0;

    // Definizione dell'overlay
    const overlay = document.createElement("div");
    overlay.id = "tutorial-overlay";
    document.body.appendChild(overlay);
  
    // Definizione del tutorialBox
    const tutorialBox = document.createElement("div");
    tutorialBox.id = "tutorial-box";
    overlay.appendChild(tutorialBox);

    // Creazione pulsante "Skip Tutorial"
    const skipButton = document.createElement("button");
    skipButton.id = "skip-tutorial-btn";
    skipButton.textContent = "Skip Tutorial";
    document.body.appendChild(skipButton);

    // Creazione pulsante "Restart Tutorial"
    const restartButton = document.createElement("button");
    restartButton.id = "restart-tutorial-btn";
    restartButton.textContent = "Start Tutorial";
    restartButton.style.display = "none";
    document.body.appendChild(restartButton);
  

    // 3. Funzioni per gestione della logica del tutorial

    // 3.1 Gestione delle transizioni tra gli steps del tutorial
    function showStep(step) {
      
      const { element, text } = tutorialSteps[step];
      const targetElement = document.querySelector(element);
  
      if (!targetElement) return;
  
      // Rimozione di eventuali evidenziazioni precedenti
      document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
  
      // Posizionamento del tutorialBox rispetto all'elemento evidenziato
      const rect = targetElement.getBoundingClientRect();
      const tutorialBox = document.getElementById("tutorial-box");
      tutorialBox.textContent = text;
  
      // Calcolo dinamico della posizione
      let offsetY = (rect.top + rect.height + 100 > window.innerHeight) ? -100 : rect.height + 20;
  
      // Transizione del tutorialBox
      tutorialBox.style.opacity = "1";
      tutorialBox.style.transform = `translate(${rect.left + rect.width / 2 - 225}px, ${rect.top + window.scrollY + offsetY}px)`;
  
      // Evidenziazione elemento attuale
      targetElement.classList.add("tutorial-highlight");

    }
  
    // 3.2 Gestione avanzamento steps (fino al termine del tutorial)
    function nextStep() {
      
      if (currentStep < tutorialSteps.length - 1) {

        currentStep++;
        const sound = new Audio("https://eleonorsrr.github.io/MeteotrAPP/assets/weather sounds/click.mp3"); 
        sound.play();
        showStep(currentStep);
        

      } else {

        endTutorial();

      }

    }
  
    // 3.3 Gestione regressione steps
    function previousStep() {
      
      if (currentStep > 0) {
  
        currentStep--;
        showStep(currentStep);
      }

    }

    // 3.4 Preload e avvio tutorial
    function preloadTutorial() {

      const overlay = document.getElementById("tutorial-overlay");
      const tutorialBox = document.getElementById("tutorial-box");
      
      overlay.style.display = "block";
      tutorialBox.textContent = "Caricamento del tutorial...";
      
      setTimeout(() => {
        // Avvio tutorial dopo il caricamento
        showStep(currentStep); 
      }, 100); 

    }
  
    // 3.5 Termine tutorial
    function endTutorial() {

        // Rimozione overlay
        const overlay = document.getElementById("tutorial-overlay");
        if (overlay) overlay.remove();

        // Rimozione evidenziazioni
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));

        // Rimozione pulsante "Skip Tutorial"
        const skipButton = document.getElementById("skip-tutorial-btn");
        if (skipButton) skipButton.style.display = "none"; 

        // Aggiunta pulsante "Restart Tutorial"
        const restartButton = document.getElementById("restart-tutorial-btn");
        if (restartButton) restartButton.style.display = "inline-block"; 

    }

    // 3.6 Riavvio tutorial
    function restartTutorial() {
        
        // Ripristino allo stato iniziale
        currentStep = 0;

        // Rimozione eventuali overlay e boxTutorial già presenti
        const existingOverlay = document.getElementById("tutorial-overlay");
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Ri-creazione overlay boxTtutorial
        const overlay = document.createElement("div");
        overlay.id = "tutorial-overlay";
        document.body.appendChild(overlay);
  
        const tutorialBox = document.createElement("div");
        tutorialBox.id = "tutorial-box";
        overlay.appendChild(tutorialBox);

        overlay.style.display = "block";
        tutorialBox.textContent = "Caricamento del tutorial...";

        // Logica gestione alternata dei pulsanti "Restart Tutorial" (nascosto) e "Skip Tutorial" (mostrato)
        const restartButton = document.getElementById("restart-tutorial-btn");
        if (restartButton) restartButton.style.display = "none";

        const skipButton = document.getElementById("skip-tutorial-btn");
        if (skipButton) skipButton.style.display = "inline-block";

        preloadTutorial();

    }
  
    preloadTutorial();
  

    // 4. Gestione EventListeners:

    // 4.1 Definizione pulsanti per navigare tra gli steps del tutorial
    document.addEventListener("keydown", (event) => {

      if (event.key === "Enter" || event.key === "ArrowRight") {

        // Blocco dei tutorial steps fino a rimozione della schermata introduttiva
        const introScreen = document.getElementById("intro-screen");

        if (!introScreen.classList.contains("hidden")) {
          document.getElementById("start-button").click();
        } else {

          if (document.activeElement.tagName === "INPUT") {
            document.getElementById("search-btn").click(); 
          } else {
            nextStep();  
          }
    
        }
    
      } else if (event.key === "ArrowLeft" || event.key === "Backspace") {

        previousStep();

      }
      
    });

    
    // 4.2 Blocco tutorial premendo il pulsante "Skip Tutorial"
    skipButton.addEventListener("click", () => {
        endTutorial();
    });

    // 4.3 Riavvio tutorial premendo il pulsante "Skip Tutorial"
    restartButton.addEventListener("click", () => {
        restartTutorial();
    });
  
});
  
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {  
      event.preventDefault(); 
      document.getElementById("skip-tutorial-btn").click();  
  }
});
