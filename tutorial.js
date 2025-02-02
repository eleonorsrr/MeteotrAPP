document.addEventListener("DOMContentLoaded", () => {
    const tutorialSteps = [
      {
        element: ".weather-panel",
        text: "In questa sezione puoi cercare una località geografica. Verranno mostrati i dati meteo, tra cui la condizione meteo attuale, informazione fondamentale per determinare quali accordi verranno proposti e per consigliarti lo strumento più adatto per riprodurli!"
      },
      {
        element: ".map-panel",
        text: "Questa mappa mostra la località che hai cercato nel pannello meteo. Qui puoi visualizzare visivamente la tua posizione e migliorare l'interazione con la ricerca meteo!",
        delay: 0
      },
      {
        element: ".central-panel",
        text: "Qui puoi selezionare gli accordi proposti in base alla condizione meteo relativa alla tua ricerca. Puoi anche interagire con questa sezione in modo dinamico: scegli una tra le quattro condizioni meteorologiche e ascoltane il suono caratteristico, seleziona una tra le scale disponibili e crea la tua melodia con gli accordi che ti verranno proposti! Gioca inoltre con gli slider relativi al suono caratteristico di ogni condizione meteorologica per immergerti completamente nell'esperienza!"
      },
      {
        element: ".bottom-panel",
        text: "In questa sezione puoi visualizzare gli accordi scelti. Puoi modificarne l'ordine a tuo piacimento o, per un tocco di imprevedibilità, puoi randomizzarli premendo il tasto fulmine!"
      },
      {
        element: "#shuffle-btn",
        text: "Ogni volta che premi questo pulsante, gli accordi vengono riordinati casualmente!"
      },
      {
        element: ".top-panel",
        text: "In questa sezione puoi regolare il BPM (tempo) e la time signature della tua melodia. Una volta scelti, utilizza i tasti Play, Stop e Reset per controllare la riproduzione di ciò che hai creato!"
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
        nextStep(); // Passa al passo successivo
      } else if (event.key === "ArrowLeft" || event.key === "Backspace") {
        previousStep(); // Torna al passo precedente
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
  
