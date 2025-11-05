const porte = document.querySelectorAll(".porta");
const bottoni = document.querySelectorAll(".bottone");
let monologues = [];
let i=-1;

//rende non cliccabili le porte
porte.forEach(porta => {
    porta.style.pointerEvents = "none";
});

//caricamento testi
fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        monologues = data.monologues;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

//quando premi avvia la funzione di scorrimento testi, una volta finiti riattiva le porte
document.body.addEventListener("click", () => { 
    i++;
    if (i < monologues.length) {
        monologueText.innerHTML = monologues[i];//innerHTML permette di mettere tag come il corsivo
    } else {
        personaggio.classList.add("invisible");
        porte.forEach(porta => {
            porta.style.pointerEvents = "auto";
        });
        bottoni.forEach(bottone => {
            bottone.classList.remove("hidden");
        });
    }
});