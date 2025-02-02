document.addEventListener("DOMContentLoaded", () => {
  const tutorialSteps = [
    {
      element: ".weather-panel",
      text: "In this section you can search for a geographic location. Weather data will be displayed, including current weather conditions, which is essential information to determine which chords will be proposed and to recommend the most suitable instrument to reproduce them!"
    },
    {
      element: ".map-panel",
      text: "This map shows the location you searched for in the weather panel. Here you can visually see your location and improve the interaction with the weather search. It is also possible to select an area/city directly by clicking on it.",
      delay: 0
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
  
    let currentStep = 0;

    const overlay = document.createElement("div");
    overlay.id = "tutorial-overlay";
    document.body.appendChild(overlay);
  
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
    restartButton.style.display = "none"; // inizialmente nascosto
    document.body.appendChild(restartButton);
  
    function showStep(step) {
      const { element, text, delay } = tutorialSteps[step];
      const targetElement = document.querySelector(element);
  
      if (!targetElement) return;
  
      // Rimuove eventuali evidenziazioni precedenti
      document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
  
      // Posiziona il tutorialBox sopra o sotto l'elemento evidenziato in base alla sua posizione
      const rect = targetElement.getBoundingClientRect();
      const tutorialBox = document.getElementById("tutorial-box");
      tutorialBox.textContent = text;
  
      /// Calcoliamo la posizione in modo dinamico
      let offsetY = (rect.top + rect.height + 100 > window.innerHeight) ? -100 : rect.height + 20;
  
      // Aggiungi la transizione al tutorialBox
      tutorialBox.style.opacity = "1";
      tutorialBox.style.transform = `translate(${rect.left + rect.width / 2 - 225}px, ${rect.top + window.scrollY + offsetY}px)`;
  
      // Evidenzia l'elemento attuale
      targetElement.classList.add("tutorial-highlight");
  
      if (delay) {
        // Ritarda l'evidenziazione della mappa per farla apparire più lentamente (opzionale)
        setTimeout(() => {
          document.querySelector(".map-panel").classList.add("tutorial-highlight");
        }, delay);
      }
    }
  
    function nextStep() {
      if (currentStep < tutorialSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        endTutorial(); // Se siamo all'ultimo passo, termina il tutorial
      }
    }
  
    function previousStep() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  
    // Funzione per terminare il tutorial
    function endTutorial() {
        // Rimuove l'overlay
        const overlay = document.getElementById("tutorial-overlay");
        if (overlay) overlay.remove();

        // Rimuove le evidenziazioni
        document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight"));
        
        // Mostra il contenuto dell'applicazione (assicurandosi che l'elemento esista)
        const appContent = document.querySelector(".app-content");
        if (appContent) {
            appContent.style.display = "block"; 
        }

        // Rimuove il pulsante "Skip"
        const skipButton = document.getElementById("skip-tutorial-btn");
        if (skipButton) skipButton.style.display = "none"; // Nascondi il tasto Skip

        // Mostra il pulsante "Restart Tutorial"
        const restartButton = document.getElementById("restart-tutorial-btn");
        if (restartButton) restartButton.style.display = "inline-block"; // Mostra il tasto Restart
    }

    // Funzione per riavviare il tutorial
    function restartTutorial() {
        
        // Ripristina lo stato iniziale
        currentStep = 0;

        // Nasconde il contenuto dell'applicazione, se presente
        const appContent = document.querySelector(".app-content");
        if (appContent) {
            appContent.style.display = "none";
        }

        // Rimuove eventuali vecchi overlay e box di tutorial
        const existingOverlay = document.getElementById("tutorial-overlay");
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Ri-crea l'overlay e il tutorial box
        const overlay = document.createElement("div");
        overlay.id = "tutorial-overlay";
        document.body.appendChild(overlay);
  
        const tutorialBox = document.createElement("div");
        tutorialBox.id = "tutorial-box";
        overlay.appendChild(tutorialBox);

        overlay.style.display = "block";
        tutorialBox.textContent = "Caricamento del tutorial...";

        // Nasconde il pulsante "Restart Tutorial" e mostra il tasto "Skip"
        const restartButton = document.getElementById("restart-tutorial-btn");
        if (restartButton) restartButton.style.display = "none"; // Nasconde il tasto Restart
        const skipButton = document.getElementById("skip-tutorial-btn");
        if (skipButton) skipButton.style.display = "inline-block"; // Mostra il tasto Skip Tutorial

        // Precarica il tutorial e avvia il primo passo
        preloadTutorial();
    }

    // Funzione per il preload
    function preloadTutorial() {
      // Pre-carica il tutorial: mostra il primo passo e aspetta il caricamento completo
      const overlay = document.getElementById("tutorial-overlay");
      const tutorialBox = document.getElementById("tutorial-box");
      
      overlay.style.display = "block";
      tutorialBox.textContent = "Caricamento del tutorial...";
      
      setTimeout(() => {
        showStep(currentStep); // Avvia il tutorial dopo il caricamento
      }, 100); // Preload per 1 secondo
    }
  
    // Avvia il tutorial con il preload
    preloadTutorial();
  
    // Ascolta i tasti per navigare tra i passi del tutorial
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === "ArrowRight") {

        // Questo if dentro all'if mi fa sì che il primo step non venga skippato finché la schermata intro non se ne va
        const introScreen = document.getElementById("intro-screen");

        if (!introScreen.classList.contains("hidden")) {
          document.getElementById("start-button").click();
        } else {
          nextStep();
        }
    
      } else if (event.key === "ArrowLeft" || event.key === "Backspace") {
        previousStep();
      }
    });

    
    // Evento per terminare il tutorial quando si preme il pulsante "Skip Tutorial"
    skipButton.addEventListener("click", () => {
        endTutorial();
    });

    // Evento per riavviare il tutorial
    restartButton.addEventListener("click", () => {
        restartTutorial();
    });
  
});
  
